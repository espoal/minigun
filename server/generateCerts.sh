#!/bin/bash

rm -rf ./certs
mkdir ./certs

cd certs

openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem -subj "/C=EU/CN=root-CA"

openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
