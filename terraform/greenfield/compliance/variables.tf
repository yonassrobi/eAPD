variable "tags_L2" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}

variable "rule_name_L2" {
  description = " sns rule name "
  type        = string
  default     = ""
}

variable "rule_description_L2" {
  description = " sns rule description "
  type        = string
  default     = ""
}

variable "function_name_L2" {
  description = "The name of the Lambda function to deploy"
  type        = string
  default     = ""
}

variable "lambda_description_L2" {
  description = "Description to use for the deployment"
  type        = string
  default     = ""
}

variable "memory_size_L2" {
  description = "Amount of memory in MB the Lambda Function can use at runtime"
  type        = number
  default     = "256"
}

variable "timeout_L2" {
  description = "Amount of time the Lambda Function has to run in seconds"
  type        = number
  default     = "70"
}

variable "filename_L2" {
  description = "Path to the function's deployment package within the local filesystem."
  type        = string
  default     = ""
}

variable "role_name_L2" {
  description = " name of the role "
  type        = string
  default     = ""
}

variable "role_description_L2" {
   description = "Description of the role."
    type       = string 
    default    = ""
}

variable "policy_name_L2" {
  description = " name of the iam policy "
  type        = string
  default     = ""
}

variable "lambda_policy_json_path_L2" {
  description = " lambdapolicy json path "
  type        = string
  default     = ""
}

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

variable "detail-type" {
  description = " event pattern detail type "
  type        = string
  default     = ""
}

variable "rule_source" {
  description = " event patter source "
  type        = string
  default     = ""
}

variable "lambda_policy_json_path" {
  description = " lambdapolicy json path "
  type        = string
  default     = ""
}

variable "tags_L3" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}

variable "rule_name_L3" {
  description = " sns rule name "
  type        = string
  default     = ""
}

variable "rule_description_L3" {
  description = " sns rule description "
  type        = string
  default     = ""
}

variable "function_name_L3" {
  description = "The name of the Lambda function to deploy"
  type        = string
  default     = ""
}

variable "lambda_description_L3" {
  description = "Description to use for the deployment"
  type        = string
  default     = ""
}

variable "memory_size_L3" {
  description = "Amount of memory in MB the Lambda Function can use at runtime"
  type        = number
  default     = "256"
}

variable "timeout_L3" {
  description = "Amount of time the Lambda Function has to run in seconds"
  type        = number
  default     = "70"
}

variable "filename_L3" {
  description = "Path to the function's deployment package within the local filesystem."
  type        = string
  default     = ""
}

variable "role_name_L3" {
  description = " name of the role "
  type        = string
  default     = ""
}

variable "role_description_L3" {
   description = "Description of the role."
    type       = string 
    default    = ""
}

variable "policy_name_L3" {
  description = " name of the iam policy "
  type        = string
  default     = ""
}

variable "lambda_policy_json_path_L3" {
  description = " lambdapolicy json path "
  type        = string
  default     = ""
}