
data "aws_caller_identity" "current" {}
locals {
    lambda_function       = toset([ "ECR2SecurityHubSendFindingsLambda", "ECRAccessProhibitedLambda", "CreateSecurityHubCustomActionTargetLambda-ECR", ])
    lambda_role           = toset([ "ECR2SecurityHubSendFindingsLambda", "ECRAccessProhibitedLambda", "CreateSecurityHubCustomActionTargetLambda-ECR", ])
    cloudwatch_rule       = toset([ "ECR2SecurityHubSendFindingsLambda", "ECRAccessProhibitedLambda", ])

    event_pattern = <<-PATTERN
    {
      "source": [
        "aws.ecr"
      ],
      "detail-type": [
        "ECR Image Scan"
      ]
    }
    PATTERN

    event_pattern_one = <<-PATTERN
    {
      "source": [
        "aws.securityhub"
      ],
      "detail-type": [
        "Security Hub Findings - Custom Action"
      ],
      "resources": [
        "${aws_securityhub_action_target.sechub-action-target.arn}"
      ]
    }
    PATTERN
}

#create Security Hub Action Target 
resource "aws_securityhub_action_target" "sechub-action-target" {
  name        = "ECR1"
  identifier  = "ECR11"
  description = "Deny Access to ECR"
}

#create cloudwatch event rule for ECR Scanning and AWS Security Hub 
resource "aws_cloudwatch_event_rule" "rule" {
    for_each = local.cloudwatch_rule
    name                = each.key
    is_enabled          = true 
    event_pattern       = each.key == "ECR2SecurityHubSendFindingsLambda" ? local.event_pattern : local.event_pattern_one
    tags = {
      Name = each.key 
    }
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
    for_each = local.lambda_role
    name                 = each.key
    assume_role_policy   = data.aws_iam_policy_document.lambda.json
    # path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
    path                 = "/delegatedadmin/developer/"
    permissions_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role_policy" "lambda" {
    for_each = local.lambda_role
    name      = each.key
    role      = aws_iam_role.lambda[ each.key ].id
    policy    = file("${path.root}/${each.key}.json")
}

resource "aws_lambda_function" "lambda" {
    for_each = local.lambda_function
    function_name                  = each.key
    role                           = aws_iam_role.lambda[ each.key ].arn
    handler                        = "index.lambda_handler"
    memory_size                    = 384
    runtime                        = "python3.7"
    timeout                        = 70
    filename                       = "${each.key}.zip"
    source_code_hash               = filebase64sha256("${each.key}.zip")
    environment  {
        variables = {

           account_num                = 156322662943
           region                     = "us-east-1"
        }
    }
    tags = {
    Name = each.key
    }  
}

resource "aws_cloudwatch_event_target" "lambda" {
    for_each = local.cloudwatch_rule
    rule               = aws_cloudwatch_event_rule.rule[ each.key ].name
    arn                = aws_lambda_function.lambda[ each.key ].arn
}

resource "aws_lambda_permission" "cloudwatch2lambda" {
    for_each = local.cloudwatch_rule
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.lambda[ each.key ].function_name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.rule[ each.key ].arn  
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

resource "aws_cloudwatch_event_target" "sns" {

    rule               = aws_cloudwatch_event_rule.rule["ECR2SecurityHubSendFindingsLambda"].name
    arn                = aws_sns_topic.email.arn
}