variable "rule_name" {
  type        = string
  default     = ""
  description = "Name  (e.g. `app` or `cluster`)."
}

variable "rule_description" {
  type        = string
  default     = ""
  description = "The description for the rule."
}

variable "event_pattern" {
  default     = null
  description = "(schedule_expression isn't specified) Event pattern described a JSON object. See full documentation of CloudWatch Events and Event Patterns for details."
  type        = bool 
}

variable "tags" {
  description = "tags to add "
  type        = map(any)
  default     = {}
}