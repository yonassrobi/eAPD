data "aws_caller_identity" "current" {}

resource "aws_securityhub_action_target" "sechub-action-target" {
  name        = "ECR1"
  identifier  = "ECR11"
  description = "Deny Access to ECR"
}

resource "aws_cloudwatch_event_rule" "securityhub" {

    name                = var.rule_name
    description         = var.rule_description
    is_enabled          = true 
    event_pattern = jsonencode({

        detail-type = [ "Security Hub Findings - Custom Action" ],
        source      = [ "aws.securityhub" ],
        resources   = [ "${aws_securityhub_action_target.sechub-action-target.arn}" ]
    })
    tags = merge(var.tags, {
      Name = var.rule_name 
    })
}

resource "aws_cloudwatch_event_target" "lambda" {

    rule               = aws_cloudwatch_event_rule.securityhub.name
    arn                = aws_lambda_function.ECR-denay-access.arn
}

resource "aws_lambda_function" "ECR-denay-access" {

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

resource "aws_lambda_permission" "cloudwatch-to-lambda" {

    #statement_id  = var.statement_id
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.ECR-denay-access.function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.securityhub.arn  
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