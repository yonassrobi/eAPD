locals {
  name_prefix = "${var.project}-${var.environment}"
}

data "aws_caller_identity" "current" {}

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

# MongoDB

