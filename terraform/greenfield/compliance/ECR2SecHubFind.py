import json
import boto3
import datetime
import uuid
import os
def lambda_handler(event, context):
    # import Lambda ENV VARs
    accountId = os.environ['account_num']
    awsRegion = os.environ['region']
    # Get ECR event details
    eventDetails = event['detail']
    repoName = eventDetails['repository-name']
    findingsevcounts = eventDetails['finding-severity-counts']
    numCritical = 0
    numMedium = 0
    numHigh = 0
    if findingsevcounts.get('CRITICAL'):
        numCritical = findingsevcounts['CRITICAL']
    if findingsevcounts.get('MEDIUM'):
        numMedium = findingsevcounts['MEDIUM']
    if findingsevcounts.get('HIGH'):
        numHigh = findingsevcounts['HIGH']
                
    # send finding to Security Hub
    severity = "LOW"
    title = "ECR Finding"
    ECRComplianceRating = 'PASSED'
    if numMedium:
        severity = "MEDIUM"
        title = "Medium ECR Vulnerability"
        ECRComplianceRating = 'FAILED'
    if numHigh:
        severity = "HIGH"
        title = "High ECR Vulnerability"
        ECRComplianceRating = 'FAILED'
    if numCritical:
        severity = "CRITICAL"
        title = "Critical ECR Vulnerability"
        ECRComplianceRating = 'FAILED'


    # ISO Time
    iso8061Time = datetime.datetime.utcnow().replace(tzinfo=datetime.timezone.utc).isoformat()
    # ASFF BIF Id
    asffID = str(uuid.uuid4())
    # import security hub boto3 client
    sechub = boto3.client('securityhub')
    # call BIF
    try:
        response = sechub.batch_import_findings(
            Findings=[
                {
                    'SchemaVersion': '2018-10-08',
                    'Id': asffID,
                    'ProductArn': 'arn:aws:securityhub:' + awsRegion + ':' + accountId + ':product/' + accountId + '/default',
                    'ProductFields': {
                        'ECRRepoName': repoName,
                    },
                    'GeneratorId': asffID,
                    'AwsAccountId': accountId,
                    'Types': [ 'Software and Configuration Checks' ],
                    'FirstObservedAt': iso8061Time,
                    'UpdatedAt': iso8061Time,
                    'CreatedAt': iso8061Time,
                    'Severity': {
                        'Label': severity
                    },
                    'Title': title,
                    'Description': title,
                    'Resources': [
                        {
                            'Type': 'AwsEcr',
                            'Id': 'AWS::::Account:' + accountId,
                            'Partition': 'aws',
                            'Region': awsRegion,
                        }
                    ],
                    'WorkflowState': 'NEW',
                    'Compliance': {'Status': ECRComplianceRating},
                    'RecordState': 'ACTIVE'
                }
            ]
        )
        print(response)
    except Exception as e:
        print(e)
        print("Submitting finding to Security Hub failed, please troubleshoot further")
        raise