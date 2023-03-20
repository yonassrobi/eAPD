# General
variable "region" { 
  default     = "us-east-1" 
  description = "AWS region"
}

variable "environment" { 
  default     = "stage" 
  description = "Environment name"
}

variable "project" { 
  default     = "eapd" 
  description = "Project name" 
}

variable "team" { 
  default     = "eapd" 
  description = "Team name"
}

variable "platform" { 
  description = "Platform name used for infrastructure deployment"
  default     = "ecs" 
}

# VPC Info
variable "vpc_id" {
  description = "VPC ID"
  type        = string
}

variable "vpc_cidr" { 
  description = "VPC CIDR"
  default     = "" 
}

variable "vpc_azs" {
  description = "VPC availability zones"
  type         = list(any)
}

variable "public_subnets" {
  description = "List of public subnets for ALB deployment"
  type        = list(any)
}

variable "private_subnets" {
  description = "List of private subnets for ECS cluster deployment"
  type        = list(any)
}

# Docker Images
variable "web_image" {
  default     = "894719201277.dkr.ecr.us-east-1.amazonaws.com/eapd-dev-web:34014d1" 
  description = "Docker image name with tag for web"
  type        = string
}

variable "api_image" {
  default     = "894719201277.dkr.ecr.us-east-1.amazonaws.com/eapd-dev-api:34014d1" 
  description = "Docker image name with tag for api"
  type        = string
}

variable "web_port" {
  default     = 8000
  type        = number
  description = "Port the application runs on"
}

variable "api_port" {
  default     = 8001
  type        = number
  description = "API port the application runs on"
}