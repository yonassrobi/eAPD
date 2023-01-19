locals {
  name_prefix = "${var.project}-${var.environment}"
}

data "aws_caller_identity" "current" {}

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

module "ecs-fargate-service" {
  source              = "./modules/ecs-fargate-service"
  name_prefix         = local.name_prefix
  project             = var.project
  team                = var.team
  region              = var.region
  environment         = var.environment
  
  vpc_id              = var.vpc_id
  vpc_public_subnets  = var.public_subnets
  vpc_private_subnets = var.private_subnets

  web_image           = var.web_image
  api_image           = var.api_image

  web_definitions = {
    "API_URL" = "",
  }
  api_definitions = {
    "API_URL" = "",
    "JWT_SECRET" = "1234",
    "NODE_ENV" = "development",
    "PORT" = "8000",
    "OKTA_API_KEY" = "1234",
    "OKTA_CLIENT_ID" = "1234",
    "OKTA_DOMAIN" = "https://dev-26650177.okta.com",
    "OKTA_SERVER_ID" = "1234"
  }
  web_secrets = []
  api_secrets = []

  web_health_check_path   = "/"
  api_health_check_path   = "/healthcheck"  
}
