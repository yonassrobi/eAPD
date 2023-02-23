variable lambda_functions {
  description = "list of aws resoures"
  type        = list(object({
        
    function_name        = string
    lambda_description  = string    
    Handler             = string
    MemorySize          = number
    Runtime             = string
    Timeout             = number
    account_num         = number
    region              = string
    
    lambda_function_py_path = string

    rule_name           = optional (string)
    rule_description    = optional (string)
    is_enabled          =  optional (bool)
    
    detail-type         = optional (string)
    source              = optional (string)
    resources           = optional (string)
    
    target_id           = optional (string)
    statement_id        = optional (string)
    role_name           = string
    role_description    = string
    policy_name         = string
    lambda_policy_json_path = string
    role_name           = string
    policy_name         = string
    
  
  }))
  default = []
}

variable "tags"{
    description = "tag"
    type        = map(any)
    default     = {}
}




