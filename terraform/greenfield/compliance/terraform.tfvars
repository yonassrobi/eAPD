
#lambda1
 function_name       = "ECR2SecurityHubSendFindingsLambda"
 lambda_description  = "Maps ECR Scan Finding into ASFF before importing to Security Hub"   
 memory_size          = 384
 timeout             = 70
 filename            = "ECR2SecHubFind.zip"

 rule_name           = "CaptureECRScanEvent"
 rule_description    = "Capture ECR Scan Events and Trigger an Action"

 role_name           = "ECRToSecHubSendFindingsLambdaRole"
 role_description    = "ECRToSecHubSendFindingsLambda-Policy "
 policy_name         = "ECRToSecHubSendFindingsLambda-Policy"
 lambda_policy_json_path = "ECRToSecHubSendFindingsLambdaRole-policy.json"

#lambda2
 function_name_L2       = "ECRAccessProhibitedLambda"
 lambda_description_L2  = "ECR1 - Deny Access to ECR due to vulnerability assesment"   
 memory_size_L2         = 256
 timeout_L2             = 60
 filename_L2            = "ECRAccProhibited.zip"

 rule_name_L2           = "ECRAccessProhibitedRule"
 rule_description_L2    = "ECR1 - Deny Access to ECR due to vulnerability assesment"

 role_name_L2           = "ECRAccessProhibitedLambdaRole"
 role_description_L2    = "ECRToSecHubSendFindingsLambda-Policy "
 policy_name_L2         = "ECRAccessProhibitedLambdaPolicy"
 lambda_policy_json_path_L2 = "ECRAccessProhibitedLambda-policy.json"

 #lambda3
 function_name_L3       = "CreateSecurityHubCustomActionTargetLambda-ECR"
 lambda_description_L3  = "Custom resource to create an action target in Security Hub"   
 memory_size_L3         = 256
 timeout_L3             = 60
 filename_L3            = "CustomActionTarget.zip"

 role_name_L3           = "SecurityHubCustomActionTargetLambdaRole"
 role_description_L3    = "CreateSecurityHubCustomActionTargetLambdaRole "
 policy_name_L3         = "CreateActionTarget-LambdaPolicy-ECR"
 lambda_policy_json_path_L3 = "CreateActionTarget-LambdaPolicy-ECR-policy.json"