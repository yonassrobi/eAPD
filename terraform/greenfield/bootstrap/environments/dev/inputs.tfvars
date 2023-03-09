environment              = "dev"
subject_claim_filters    = ["repo:yonassrobi/eAPD:*", "repo:Enterprise-CMCS/eAPD:*"]
github_actions_roles     = [
    {
        role_name: "github_ecs_dev_role",
        description: "github actions ecs dev role ",
        policy_name: "github_actions_ecs_dev_pipline_policy",
        role_permissions_policy_json_path: "environments/dev/ecs_permission_policy.json"
    }
]

#rds
#rds
identifier             = "eapd-dev"

engine                 = "postgres"
engine_version         = "13.7"
instance_class         = "db.t3.large"
allocated_storage      = 100

db_name                = "eapd-dev-db"
username               = "postgres"
port                   = 5432



vpc_security_group_ids = ["sg-0f51b02ff4e3fe26d"]
subnet_group_name      = "eapd-dev-subnet-group"
parameter_group_name   = "postgres13"
family                 = "postgres13"
subnet_ids             = [ "subnet-01c495bc99a10d98b", "subnet-05f418b1af86a8610" ]


skip_final_snapshot       = true
final_snapshot_identifier = "eapd-dev-postgres"
deletion_protection       = false
aws_secretsmanager_secret_name = "eapd-dev-postgres-pass"
recovery_window_in_days   = 0
