data "aws_caller_identity" "current" {}

resource "aws_lambda_function" "sechub-remediation" {

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
           region                     = "us-east-1"
        }
    }
    tags = {
    Name = var.function_name
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