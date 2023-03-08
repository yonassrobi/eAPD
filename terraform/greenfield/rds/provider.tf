terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 3.30.0"
    }
  }

  required_version = ">= 0.14.6"

  backend "s3" {
    bucket         = "eapd-dev-terraform-state"
    key            = "dev/rds/terraform.tfstate"
    dynamodb_table = "terraform-state-lock"
    region         = "us-east-1"
    encrypt        = "true"
  }
}

provider "aws" {
  region = "us-east-1"
}