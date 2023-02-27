
module "ecr-to-sechub-findings" {
    source = "./module/ECR2SecHub"
    rule_name                      = var.rule_name
    rule_description               = var.rule_description
    function_name                  = var.function_name
    lambda_description             = var.lambda_description
    #handler                        = var.handler
    memory_size                    = var.memory_size
    #runtime                        = var.runtime
    timeout                        = var.timeout
    filename                       = var.filename
    lambda_policy_json_path        = var.lambda_policy_json_path
    #statement_id                   = var.statement_id
    role_name                      = var.role_name
    role_description               = var.role_description
    policy_name                    = var.policy_name  

}

module "ecr-access-prohibit" {
    source = "./module/ECRAccessProhibit"
    rule_name                      = var.rule_name_L2
    rule_description               = var.rule_description_L2
    function_name                  = var.function_name_L2
    lambda_description             = var.lambda_description_L2
    #handler                        = var.handler_L2
    memory_size                    = var.memory_size_L2
    #runtime                        = var.runtime_L2
    timeout                        = var.timeout_L2
    filename                       = var.filename_L2
    lambda_policy_json_path        = var.lambda_policy_json_path_L2
    #statement_id                   = var.statement_id
    role_name                      = var.role_name_L2
    role_description               = var.role_description_L2
    policy_name                    = var.policy_name_L2 

}

module "create-action-target" {
    source = "./module/CreateActionTarget"
    function_name                  = var.function_name_L3
    lambda_description             = var.lambda_description_L3
    memory_size                    = var.memory_size_L3
    timeout                        = var.timeout_L3
    filename                       = var.filename_L3
    lambda_policy_json_path        = var.lambda_policy_json_path_L3
    role_name                      = var.role_name_L3
    role_description               = var.role_description_L3
    policy_name                    = var.policy_name_L3 

}
