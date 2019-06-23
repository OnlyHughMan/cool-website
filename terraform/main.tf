provider "aws" {
  region                  = "us-east-1"
  shared_credentials_file = "~/.aws/credentials"
}

variable "www_domain_name" {
  default = "www.hugh.codes"
}

variable "root_domain_name" {
  default = "hugh.codes"
}
