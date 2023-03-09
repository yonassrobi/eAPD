environment              = "preview"
subject_claim_filters    = ["repo:yonassrobi/eAPD:*", "repo:Enterprise-CMCS/eAPD:*"]
github_actions_roles     = [
    {
        role_name: "github_ecs_preview_role",
        description: "github actions ecs preview role ",
        policy_name: "github_actions_ecs_preview_pipline_policy",
        role_permissions_policy_json_path: "environments/preview/ecs_permission_policy.json"
    }
]
