/* LIBRARIES */
const aws = require("aws-sdk");
const dynamo = new aws.DynamoDB({ region: "us-east-1" });

async function lookupSKU(macAddress, dynamoDB = null) {
  var params = {
    "TableName": "ProvisioningResourcesServerless",
    "Key": {
      "MacAddress": { "S": macAddress },
    },
  };

  const response = await dynamo.getItem(params).promise();
  return response.Item.SKU;
}

async function getSKU(event) {
  console.log("Processing Request");
  const macAddress = event.MacAddress ? event.MacAddress : null;
  const sku = await lookupSKU(macAddress);

  return {
    allowProvisioning: true,
    parameterOverrides: {
      SKU: sku,
    },
  };
}

module.exports.getSKU = getSKU;
