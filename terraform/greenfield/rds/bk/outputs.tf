output "db_endpoint" {
  description = "The ARN of the AWS OIDC identity provider"
  value = module.aws-rds.db_endpoint
}

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


  {
        Function_Name        : "ECRAccessProhibitedLambda"
        lambda_description  : "ECR1 - Deny Access to ECR due to vulnerability assesment"    
        Handler             : "index.lambda_handler"
        MemorySize          : 256
        Runtime             : "python3.7"
        Timeout             : 60
        #filename            : "CreateSecurityHubCustomActionTargetLambda-ECR.zip"
    
        account_num : "156322662943"
        region      : "us-east-1"
      
        lambda_function_py_path : "./code/ECRAccessProhibitedLambda.py"
        #role
        role_name          : "ECRAccessProhibitedLambdaPolicy",
        role_description   : "ECRAccessProhibitedLambdaPolicy ",
        policy_name        : "ECRAccessProhibitedLambdaPolicy",
        lambda_policy_json_path : "ECRAccessProhibitedLambdaPolicy-policy.json"
    }


 function_name        : "CreateSecurityHubCustomActionTargetLambda-ECR"
 lambda_description         : "Custom resource to create an action target in Security Hub"    
 Handler             : "index.lambda_handler"
 MemorySize          : 256
 Runtime             : "python3.7"
 Timeout             : 60
 #filename            : "CreateSecurityHubCustomActionTargetLambda-ECR.zip"
 account_num : "156322662943"
 region      : "us-east-1"
 
#eventbridge
 name                : "ECRAccessProhibitedRule"
 rule_name           : "ECRAccessProhibitedRule"
 rule_description    : "ECR1 - Deny Access to ECR due to vulnerability assesment"
 is_enabled          :  true
 
 detail-type : "Security Hub Findings - Custom Action"
 source      : "aws.securityhub"
 #resources  : "aws_securityhub_action_target.this.arn
 
 target_id           : "ECRAccessProhibitedLambda"

 #lambdaPermission 
 statement_id        : "ECRAccessProhibitedLambda"
 lambda_function_py_path : "CustomActionTarget.py"

 #role
 role_name           : "CreateSecurityHubCustomActionTargetLambdaRole",
 role_description    : "CreateActionTarget-LambdaPolicy-ECR ",
 policy_name         : "CreateActionTarget-LambdaPolicy-ECR",
 lambda_policy_json_path : "CreateActionTarget-LambdaPolicy-ECR-policy.json"