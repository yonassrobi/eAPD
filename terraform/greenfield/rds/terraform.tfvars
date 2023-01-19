 #rds
 identifier             = "rds-module-test"

  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = "db.t3.large"
  allocated_storage      = 100

  db_name                = "test"
  username               = "postgres"
  port                   = 5432

  

  vpc_security_group_ids = ["sg-003d2d2b207815be2"]
  db_subnet_group_name   = "test-sg"
  parameter_group_name   = "postgres"
  

  skip_final_snapshot       = true
  final_snapshot_identifier = "test12347866"
  deletion_protection       = false
  aws_secretsmanager_secret_name = "db-pass"
  recovery_window_in_days = 0