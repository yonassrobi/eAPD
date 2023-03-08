data "aws_caller_identity" "current" {}

module "aws-parameter-group" {
  source         = "./module/db_parameter_group" 
  name           = var.parameter_group_name
  family         = var.family
}

module "aws-subnet-group" {
  source         = "./module/db_subnet_group" 
  name           = var.subnet_group_name
  subnet_ids     = var.subnet_ids
}


module "aws-rds" {
  source      = "./module/rds"
  identifier             = var.identifier

  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  license_model          = var.license_model

 
  username               = var.username
  password               = var.password
  port                   = var.port
  

  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = module.aws-subnet-group.db_subnet_group_name
  parameter_group_name   = module.aws-parameter-group.db_parameter_group_name
  enabled_cloudwatch_logs_exports = var.enabled_cloudwatch_logs_exports
  

  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.final_snapshot_identifier
  deletion_protection       = var.deletion_protection  

  tags                      = var.tags
  aws_secretsmanager_secret_name = var.aws_secretsmanager_secret_name
  recovery_window_in_days   = var.recovery_window_in_days
  
}