output "db_endpoint" {
  description = "The ARN of the AWS OIDC identity provider"
  value = module.aws-rds.db_endpoint
}