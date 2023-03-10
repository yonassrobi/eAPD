data "aws_ami" "this" {
  
  most_recent      = true
  #name_regex       = ""
  owners           = ["self"]

  filter {
    name   = "architecture"
    values = [" "]
  }

  filter {
    name   = "root-device-type"
    values = ["ebs"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

module "ec2-sgs" {
    source                      = ../security-security_groups
    vpc_id                      = var.vpc_id
    tags                        = var.security_group_tags
    ingresses                   = var.ingresses
    egresses                    = var.egresses
    security_group_name         = var.security_group_name
    security_group_description  = var.security_group_description
    
}

data "template_file" "this" {
  template = "${file("${path.module}/init.tpl")}"
  vars = {
    variables = var.variables 
  }
}

resource "aws_instance" "this" {

  ami                         = data.aws_ami.this
  instance_type               = var.instance_type
  user_data                   = data.template_file.this
  subnet_id                   = var.subnet_id
  vpc_security_group_ids      = concat([ module.ec2-sgs.security_group_id ], var.additional_security_groups )
  key_name                    = var.key_name
  monitoring                  = var.monitoring
  
  dynamic "root_block_device" {
    for_each = var.root_block_devices
    content {
      encrypted             = lookup(root_block_device.value, "encrypted", null)
      kms_key_id            = lookup(root_block_device.value, "kms_key_id", null)
      volume_size           = lookup(root_block_device.value, "volume_size", null)
    }
  }

  dynamic "ebs_block_device" {
    for_each = var.ebs_block_devices
    content {
      device_name           = ebs_block_device.value.device_name
      encrypted             = lookup(ebs_block_device.value, "encrypted", null)
      kms_key_id            = lookup(ebs_block_device.value, "kms_key_id", null)
      volume_size           = lookup(ebs_block_device.value, "volume_size", null)
    }
  }

  tags          = var.tags
  volume_tags   = var.volume_tags
}