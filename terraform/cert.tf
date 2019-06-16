resource "aws_acm_certificate" "certificate" {
  domain_name       = "*.${var.root_domain_name}"
  validation_method = "DNS"

  lifecycle {
    create_before_destroy = true
  }
}