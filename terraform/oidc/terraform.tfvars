
  subject_claim_filters                      = ["org/b874a13f-2c70-4cd1-aaa6-edac8cc75526/project/fc98eb8c-5243-4286-9cbc-3b9305401c76/user/*"]
  #audience_list                              = ["b874a13f-2c70-4cd1-aaa6-edac8cc75526"]
  #thumbprint_list                            = ["9e99a48a9960b14926bb7f3b02e22da2b0ab7280"]
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
