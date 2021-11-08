/* LIBRARIES */
const aws = require( 'aws-sdk' );
const dynamo = new aws.DynamoDB.DocumentClient();

async function lookupSKU( macAddress, dynamoDB = null ){
    var params = {
        TableName: 'ProvisioningResourcesServerless',
        Key: {
            'MacAddress': {S: macAddress}
        }
    };

    const response = await dynamo.getItem(params);
    return response.Items[0].Sku;
}

async function getSKU( event ){
    const macAddress = event.parameters && event.parameters.MACAddress ? event.parameters.MACAddress : null;
    const sku = await lookupSKU(macAddress);

    return {
        "allowProvisioning": true,
        "parameterOverrides" : {
            "SKU": sku,
        }
    };
}c

module.exports.getSKU = getSKU;