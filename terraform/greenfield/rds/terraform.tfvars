 #rds
 identifier             = "eapd-dev-postgres"

  engine                 = "postgres"
  engine_version         = "13.7"
  instance_class         = "db.t3.large"
  allocated_storage      = 100

  db_name                = "eapd-dev-db"
  username               = "postgres"
  port                   = 5432
  
  

  vpc_security_group_ids = ["sg-0f51b02ff4e3fe26d"]
  subnet_group_name   = "privet-sbg"
  parameter_group_name   = "postgres"
  family                 = "postgres13"
  subnet_ids             = [ "subnet-01c495bc99a10d98b", "subnet-05f418b1af86a8610" ]
  

  skip_final_snapshot       = true
  final_snapshot_identifier = "eapd-dev-postgres"
  deletion_protection       = false
  aws_secretsmanager_secret_name = "eapd-dev-postgres-pass"
  recovery_window_in_days = 0