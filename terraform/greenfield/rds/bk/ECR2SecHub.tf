data "aws_caller_identity" "current" {}

resource "aws_cloudwatch_event_rule" "this" {

    name                = var.rule_name
    description         = var.rule_description
    is_enabled          = true 
    event_pattern = jsonencode({

        detail-type = "ECR Image Scan",
        source = "aws.ecr",
        resources   = var.resources

    })
    tags = merge(var.tags, {
      Name = var.rule_name 
    })
}

resource "aws_cloudwatch_event_target" "lambda" {

    rule               = aws_cloudwatch_event_rule.this.name
    arn                = aws_lambda_function.this.arn
}

resource "aws_cloudwatch_event_target" "sns" {

    rule               = aws_cloudwatch_event_rule.this.name
    arn                = aws_sns_topic.this.arn
}

resource "aws_lambda_function" "this" {

    function_name                  = var.function_name
    description                    = var.lambda_description
    role                           = aws_iam_role.this.arn
    handler                        = "index.lambda_handler"
    memory_size                    = var.memory_size
    runtime                        = "python3.7"
    timeout                        = var.timeout
    filename                       = var.filename
    source_code_hash               = filebase64sha256("${var.filename}")
    environment  {
        variables = {

           account_num                = 156322662943
           region                     = "us-east-1"
        }
    }
    tags = {
    Name = var.function_name
    }  
}

resource "aws_lambda_permission" "this" {

    statement_id  = var.statement_id
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.this.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.this.arn  
}

data "aws_iam_policy_document" "lambda" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "this" {
     
    name                 = var.role_name
    description          = var.role_description
    assume_role_policy   = data.aws_iam_policy_document.lambda.json
    # path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
    path                 = "/delegatedadmin/developer/"
    permissions_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role_policy" "this" {
    
    name      = var.policy_name
    role      = aws_iam_role.this.id
    policy    = file("${path.root}/${var.lambda_policy_json_path}")
}

resource "aws_sns_topic" "this" {
  name = var.topic_name
}

resource "aws_sns_topic_subscription" "this" {
    topic_arn = aws_sns_topic.this.arn
    protocol  = var.protocol
    endpoint  = var.endpoint
}

data "aws_iam_policy_document" "sns" {
  policy_id = "sns__default_policy_ID"

  statement {
    actions = [
      "SNS:GetTopicAttributes",
      "SNS:SetTopicAttributes",
      "SNS:AddPermission",
      "SNS:RemovePermission",
      "SNS:DeleteTopic",
      "SNS:Subscribe",
      "SNS:ListSubscriptionsByTopic",
      "SNS:Publish",
      "SNS:Receive"
    ]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceOwner"

      values = [
        data.aws_caller_identity.current.account_id
      ]
    }

    effect = "Allow"

    principals {
      type        = "AWS"
      identifiers = ["*"]
    }

    resources = [
      aws_sns_topic.this.arn
    ]

    sid = "sns__default_statement_ID"
  }
  
  statement {
    actions = [
      "sns:Publish"
    ]

    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["events.amazonaws.com"]
    }

    resources = [
      aws_sns_topic.this.arn
    ]

    sid = "TrustCWEToPublishEventsToMyTopic"
  }
}

resource "aws_sns_topic_policy" "this" {
  arn    = aws_sns_topic.this.arn
  policy = data.aws_iam_policy_document.sns.json
}


################

variable "tags" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}

variable "rule_name" {
  description = " sns rule name "
  type        = string
  default     = ""
}

variable "rule_description" {
  description = " sns rule description "
  type        = string
  default     = ""
}

variable "function_name" {
  description = "The name of the Lambda function to deploy"
  type        = string
  default     = ""
}

variable "lambda_description" {
  description = "Description to use for the deployment"
  type        = string
  default     = ""
}

variable "handler" {
  description = "Function entrypoint"
  type        = string
  default     = ""
}

variable "memory_size" {
  description = "Amount of memory in MB the Lambda Function can use at runtime"
  type        = number
  default     = "256"
}

variable "runtime" {
  description = "Identifier of the function's runtime"
  type        = string
  default     = ""
}

variable "timeout" {
  description = "Amount of time the Lambda Function has to run in seconds"
  type        = number
  default     = "70"
}

variable "filename" {
  description = "Path to the function's deployment package within the local filesystem."
  type        = string
  default     = ""
}

variable "statement_id" {
  description = " A unique statement identifier "
  type        = string
  default     = ""
}

variable "role_name" {
  description = " name of the role "
  type        = string
  default     = ""
}

variable "role_description" {
   description = "Description of the role."
    type       = string 
    default    = ""
}

variable "policy_name" {
  description = " name of the iam policy "
  type        = string
  default     = ""
}

variable "topic_name" {
  description = " name of the sns topic "
  type        = string
  default     = ""
}

variable "protocol" {
  description = " The protocol to use "
  type        = string
  default     = ""
}

variable "endpoint" {
  description = " The endpoint to send data to "
  type        = string
  default     = ""
}

variable "lambda_policy_json_path" {
  description = " lambdapolicy json path "
  type        = string
  default     = ""
}

variable "resources" {
  description = " resources arn "
  type        = string
  default     = null
}

