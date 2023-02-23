module "eventbridge" {
  source = "./module/image_compliance"
  name        = var.Name

  description         = var.description
  is_enabled          = var.is_enabled 
  event_pattern = jsonencode({
        "detail-type" : ["ECR Image Scan"],
        "source" : ["aws.ecr"]
      })
  tags = merge(var.tags, {
    Name = var.Name
  })