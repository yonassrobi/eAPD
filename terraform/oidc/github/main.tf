module "github-aws-oidc-provider" {
  source = "github.com/Enterprise-CMCS/github-actions-runner-aws//github-oidc/terraform"
  subject_claim_filters                      = var.subject_claim_filters
}