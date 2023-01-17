variable "subject_claim_filters" {
  description = "A list of valid subject claim filters" # see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#example-subject-claims for examples of filtering by branch or environment
  type        = list(string)
}