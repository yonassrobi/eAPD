resource "random_password" "db_password" {
  length           = 16
  special          = true
  override_special = "!#$%&*()-_=+[]{}<>:?"
}

resource "aws_secretsmanager_secret" "db_password" {
  name = var.aws_secretsmanager_secret_name
  recovery_window_in_days = var.recovery_window_in_days
}

resource "aws_secretsmanager_secret_version" "db_password" {
  secret_id     = aws_secretsmanager_secret.db_password.id
  secret_string = random_password.db_password.result
  
}


resource "aws_db_instance" "db" {

  identifier             = var.identifier

  engine                 = var.engine
  engine_version         = var.engine_version
  instance_class         = var.instance_class
  allocated_storage      = var.allocated_storage
  license_model          = var.license_model

  
  username               = var.username
  password               = random_password.db_password.result
  port                   = var.port

  
  availability_zone      = var.availability_zone
  multi_az               = var.multi_az
  vpc_security_group_ids = var.vpc_security_group_ids
  db_subnet_group_name   = var.db_subnet_group_name
  parameter_group_name   = var.parameter_group_name
  publicly_accessible    = var.publicly_accessible
  

  skip_final_snapshot       = var.skip_final_snapshot
  final_snapshot_identifier = var.final_snapshot_identifier
  deletion_protection       = var.deletion_protection  

  tags                      = var.tags

}