 #rds
 identifier             = "rds-module-test"

  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = "db.t3.large"
  allocated_storage      = 100

  db_name                = "eapd-dev-db"
  username               = "postgres"
  port                   = 5432
  
  

  vpc_security_group_ids = ["sg-003d2d2b207815be2"]
  subnet_group_name   = "private"
  parameter_group_name   = "postgres13"
  family                 = "postgres13"
  subnet_ids             = [ "subnet-0bc8417125b737339", "subnet-06fcadd96bcc40ea7" ]
  

  skip_final_snapshot       = true
  final_snapshot_identifier = "test12347866"
  deletion_protection       = false
  aws_secretsmanager_secret_name = "db-pass"
  recovery_window_in_days = 0
  enabled_cloudwatch_logs_exports       = [ "postgresql" ]