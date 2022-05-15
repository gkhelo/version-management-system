#!/bin/bash

SECURITY_DIR=vms-app/src/main/resources/security

mkdir -p $SECURITY_DIR

openssl genpkey -algorithm RSA -out $SECURITY_DIR/private_key.pem -pkeyopt rsa_keygen_bits:2048
openssl rsa -pubout -in $SECURITY_DIR/private_key.pem -out $SECURITY_DIR/public_key.pem
