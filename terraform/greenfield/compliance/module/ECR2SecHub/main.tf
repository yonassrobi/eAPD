data "aws_caller_identity" "current" {}

resource "aws_cloudwatch_event_rule" "ecr" {

    name                = var.rule_name
    description         = var.rule_description
    is_enabled          = true 
    event_pattern = jsonencode({

        detail-type = [ "ECR Image Scan" ],
        source      = [ "aws.ecr" ]

    })
    tags = merge(var.tags, {
      Name = var.rule_name 
    })
}

resource "aws_cloudwatch_event_target" "lambda" {

    rule               = aws_cloudwatch_event_rule.ecr.name
    arn                = aws_lambda_function.ecr2sechub-findings.arn
}

resource "aws_cloudwatch_event_target" "sns" {

    rule               = aws_cloudwatch_event_rule.ecr.name
    arn                = aws_sns_topic.email.arn
}

resource "aws_lambda_function" "ecr2sechub-findings" {

    function_name                  = var.function_name
    description                    = var.lambda_description
    role                           = aws_iam_role.lambda.arn
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

resource "aws_lambda_permission" "cloudwatch2lambda" {

    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.ecr2sechub-findings.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.ecr.arn  
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

resource "aws_iam_role" "lambda" {
     
    name                 = var.role_name
    description          = var.role_description
    assume_role_policy   = data.aws_iam_policy_document.lambda.json
    # path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
    path                 = "/delegatedadmin/developer/"
    permissions_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role_policy" "lambda" {
    
    name      = var.policy_name
    role      = aws_iam_role.lambda.id
    policy    = file("${path.root}/${var.lambda_policy_json_path}")
}

resource "aws_sns_topic" "email" {
  name = "ECR-image-scan"
}

resource "aws_sns_topic_subscription" "email" {
    topic_arn = aws_sns_topic.email.arn
    protocol  = "email"
    endpoint  = "araya@samtek.io"
}

data "aws_iam_policy_document" "sns" {
  policy_id = "__default_policy_ID"

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
      aws_sns_topic.email.arn
    ]

    sid = "__default_statement_ID"
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
      aws_sns_topic.email.arn
    ]

    sid = "TrustCWEToPublishEventsToMyTopic"
  }
}

resource "aws_sns_topic_policy" "email" {
  arn    = aws_sns_topic.email.arn
  policy = data.aws_iam_policy_document.sns.json
}

