import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  try {
    const items = event.Records.map((record) => {
      const jsonData = Buffer.from(record.kinesis.data, "base64").toString(
        "ascii"
      );
      console.log("Decoded record:", jsonData);

      const item = JSON.parse(jsonData);

      const putRequest = {
        PutRequest: {
          Item: item,
        },
      };

      return putRequest;
    });

    const params = {
      RequestItems: {
        [tableName]: items,
      },
    };

    const batchWriteCmd = new BatchWriteCommand(params);

    return await ddbDocClient.send(batchWriteCmd);
  } catch (err) {
    console.log("Error occured: ", err);
    throw err;
  }
};
