provider "aws" {
  region = "ap-southeast-2"
  shared_credentials_file = "~/.aws/credentials"

}

variable "www_domain_name" {
  default = "www.hughvidler.com"
}

variable "root_domain_name" {
  default = "hughvidler.com"
}