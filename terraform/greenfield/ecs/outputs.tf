output "WEB_ECR_Repository" {
  description = "Web ECR Repository url"
  value       = aws_ecr_repository.web-ecr.repository_url
}

output "API_ECR_Repository" {
  description = "API ECR Repository url"
  value       = aws_ecr_repository.api-ecr.repository_url
}

output "Application_Endpoint" {
  description = "Endpoint for application"
  value       = module.ecs-fargate-service.load_balancer_endpoint
}