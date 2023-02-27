variable "action_target_name" {
  description = " The name of the custom action target. "
  type        = string
  default     = ""
}

variable "action_target_description" {
   description = "The description for the custom action target."
    type       = string 
    default    = ""
}

variable "action_target_identifier" {
  description = " The ID for the custom action target "
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