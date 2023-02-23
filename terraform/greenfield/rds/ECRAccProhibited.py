import boto3
import json
import os
def lambda_handler(event, context):

    repoName = str(event['detail']['findings'][0]['ProductFields']['ECRRepoName'])
    ecr = boto3.client('ecr')
    try:
        policyText = '{\n  "Version" : "2008-10-17",\n  "Statement" : [ {\n    "Sid" : "deny all",\n    "Effect" : "Deny",\n    "Principal" : "*",\n "Action" : [ "ecr:GetDownloadUrlForLayer", "ecr:BatchGetImage", "ecr:BatchCheckLayerAvailability" ]\n } ]\n}'
        response = ecr.set_repository_policy(
            repositoryName=repoName,
            policyText=policyText
        )

    except Exception as e:
        print(e)
        print("SSM automation execution error")
        raise