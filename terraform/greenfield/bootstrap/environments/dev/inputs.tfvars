environment              = "dev"
subject_claim_filters    = ["repo:yonassrobi/eAPD:*", "repo:Enterprise-CMCS/eAPD:*"]
github_actions_roles     = [
    {
        role_name: "github_ecs_role",
        description: "github actions ecs role ",
        policy_name: "github_actions_ecs_pipline_policy",
        role_permissions_policy_json_path: "environments/dev/ecs_permission_policy.json"
    }
]
