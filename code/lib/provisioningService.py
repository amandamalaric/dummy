import json
import boto3
from boto3.dynamodb.conditions import Key

def lookupSKU(MacAddress, dynamodb=None):
    if not dynamodb:
        dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('ProvisioningResources')
    response = table.query(
        KeyConditionExpression=Key('MacAddress').eq(MacAddress)
    )
    return response['Items'][0]['SKU']

def lambda_handler(event, context):
    SKU = lookupSKU(event.get('parameters').get('MACAddress'))

    output = {
        "allowProvisioning": True,
        "parameterOverrides" : {
            "SKU": SKU,
        }
    }
    print(output)
    return output
