
  subject_claim_filters                      = ["repo:yonassrobi/OIDC:*"]
  oidc_provider_role_name                    =  "github-actions-identity-provider-role"

  github_actions_roles = [
      {
          role_name: "github_ecs_role",
          description: "github actions ecs role for use with Circlrci OIDC ",
          policy_name: "github_actions_ecs_pipline_policy",
          role_permissions_policy_json_path: "circleci_ecs_pipline_policy.json"
      },
      {
          role_name: "eapd_pipline_role",
          description: "eapd pipline role for use with github actions OIDC ",
          policy_name: "github_actions_eapd_pipline_policy",
          role_permissions_policy_json_path: "ePAD_circleci_pipline_permission_policy.json"
      }

  ]
