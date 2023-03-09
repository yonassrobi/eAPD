module "actions-aws-oidc-provider" {
  source = "./modules/oidc/github"

  subject_claim_filters                      = var.subject_claim_filters
  #audience_list                              = var.audience_list
  #thumbprint_list                            = var.thumbprint_list
  oidc_provider_role_name                    = var.oidc_provider_role_name
  github_actions_roles                       = var.github_actions_roles
}