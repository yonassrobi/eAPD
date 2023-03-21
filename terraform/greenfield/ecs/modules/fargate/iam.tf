data "aws_caller_identity" "current" {}

resource "aws_iam_role" "task" {
  name = "${var.name_prefix}-task-role"
  path = "/delegatedadmin/developer/"
  assume_role_policy = data.aws_iam_policy_document.ecs_tasks_assume_role.json
  permissions_boundary  = "arn:aws:iam::${data.aws_caller_identity.current.account_id}:policy/cms-cloud-admin/developer-boundary-policy"
}

data "aws_iam_policy_document" "ecs_tasks_assume_role" {
  statement {
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["ecs-tasks.amazonaws.com"]
    }
  }
}

resource "aws_iam_role_policy_attachment" "task" {
  role       = aws_iam_role.task.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy"
}

resource "aws_iam_role_policy_attachment" "task-secrets" {
  role       = aws_iam_role.task.name
  policy_arn = "arn:aws:iam::894719201277:policy/delegatedadmin/developer/eapd-dev-task-secrets-policy20230321143117280200000001"
}
