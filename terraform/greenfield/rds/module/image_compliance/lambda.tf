data "aws_caller_identity" "current" {}

resource "aws_cloudwatch_event_rule" "this" {

    for_each            = {for lambda in var.lambda_functions: lambda.function_name => lambda if lambda.is_enabled == true}
    name                = lookup(each.value, "rule_name")

    description         = lookup(each.value, "rule_description")
    is_enabled          = lookup(each.value, "is_enabled") 
    #event_pattern       = lookup(each.value, "event_pattern", [])
    event_pattern       = jsonencode({
      detail-type                = lookup(each.value, "detail-type")
      source                     = lookup(each.value, "source")
      resources                   = lookup(each.value, "resources")
    })
    tags = merge(var.tags, {
      Name = lookup(each.value, "rule_name")
  })
}

resource "aws_cloudwatch_event_target" "this" {

    for_each           = {for lambda in var.lambda_functions: lambda.function_name => lambda if lambda.target_id != ""}
    rule               = aws_lambda_function.this[each.value.function_name].name
    arn                = aws_lambda_function.this[each.value.function_name].arn
    target_id          = lookup(each.value, "target_id") 
  
}

resource "aws_lambda_function" "this" {

    for_each                       = {for lambda in var.lambda_functions: lambda.function_name => lambda }
    function_name                  = lookup(each.value, "function_name")
    description                    = lookup(each.value, "lambda_description")
    role                           = aws_iam_role.this[each.value.function_name].arn
    handler                        = lookup(each.value, "handler")
    memory_size                    = lookup(each.value, "memory_size")
    runtime                        = lookup(each.value, "runtime")
    timeout                        = lookup(each.value, "timeout") 
    filename                       = file("${path.root}/${lookup(each.value, "lambda_function_py_path")}")
    source_code_hash               = filebase64sha256(file("${path.root}/${lookup(each.value, "lambda_function_py_path")}"))
    #environment                   = lookup(each.value, "environment", [])
    environment  {
        variables = {

           account_num                = lookup(each.value, "account_num")
           region                     = lookup(each.value, "region")
        }
    }
    tags = {
    Name = lookup(each.value, "function_name")
    }
    
}

resource "aws_lambda_permission" "this" {
    for_each      = {for lambda in var.lambda_functions: lambda.function_name => lambda if lambda.statement_id != ""}
    statement_id  = lookup(each.value, "statement_id")
    action        = "lambda:InvokeFunction"
    function_name = aws_lambda_function.this[each.value.function_name].name
    principal     = "events.amazonaws.com"
    source_arn    = aws_cloudwatch_event_rule.this[each.value.function_name].arn
  
}

data "aws_iam_policy_document" "this" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "this" {
     
    for_each             = {for lambda in var.lambda_functions: lambda.function_name => lambda}
    name                 = lookup(each.value, "role_name")
    description          = lookup(each.value, "role_description")
    assume_role_policy   = data.aws_iam_policy_document.this.json
    # path and permssions boundary as required per https://cloud.cms.gov/creating-identity-access-management-policies
    path                 = "/delegatedadmin/developer/"
    permissions_boundary = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

resource "aws_iam_role_policy" "this" {
    for_each  = {for lambda in var.lambda_functions: lambda.function_name => lambda}
    name      = lookup(each.value, "policy_name")
    role      = aws_iam_role.this[each.value.function_name].id
    policy    = file("${path.root}/${lookup(each.value, "lambda_policy_json_path")}")
}

#data "archive_file" "this" {  
#    for_each  = {for lambda in var.lambda_functions: lambda.function_name => lambda}
#    type = "zip"  
#   source_file = file("${path.root}/${lookup(each.value, "lambda_function_py_path")}") 
#   output_path = "${lookup(each.value, "function_name")}.zip"
#}

#resource "aws_securityhub_action_target" "this" {
#    name        = var.action_target_name
#    identifier  = var.action_target_id 
#    description = var.action_target_description
#}