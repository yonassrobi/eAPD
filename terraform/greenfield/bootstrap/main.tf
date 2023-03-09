locals {
  name_prefix = "${var.project}-${var.environment}"
}

# Github OIDC
module "actions-aws-oidc-provider" {
  source = "./modules/oidc/github"

  subject_claim_filters                      = var.subject_claim_filters
  audience_list                              = var.audience_list
  thumbprint_list                            = var.thumbprint_list
  github_actions_roles                       = var.github_actions_roles
}

# S3 Bucket Creation



# ECR Repositories

resource "aws_ecr_repository" "web-ecr" {
  name         = "${var.project}-${var.environment}-web"
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project = var.project
    Team    = var.team
    Environment = var.environment
  }
}

resource "aws_ecr_repository" "api-ecr" {
  name         = "${var.project}-${var.environment}-api"
  image_scanning_configuration {
    scan_on_push = true
  }

  tags = {
    Project = var.project
    Team    = var.team
    Environment = var.environment
  }
}

#RDS

data "aws_caller_identity" "current" {}

module "aws-parameter-group" {
  source         = "./modules/db_parameter_group" 
  name           = var.parameter_group_name
  family         = var.family
}

module "aws-subnet-group" {
  source         = "./modules/db_subnet_group" 
  name           = var.subnet_group_name
  subnet_ids     = var.subnet_ids
}


module "aws-rds" {
  source      = "./modules/rds"
  identifier             = var.identifier

  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  license_model          = var.license_model

 
  username               = var.username
  password               = var.password
  port                   = var.port
  
  final_snapshot_identifier = var.final_snapshot_identifier
  skip_final_snapshot     = var.skip_final_snapshot
  recovery_window_in_days = var.recovery_window_in_days
  vpc_security_group_ids  = var.vpc_security_group_ids
  db_subnet_group_name    = module.aws-subnet-group.db_subnet_group_name
  parameter_group_name    = module.aws-parameter-group.db_parameter_group_name
  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
}  

# MongoDB

