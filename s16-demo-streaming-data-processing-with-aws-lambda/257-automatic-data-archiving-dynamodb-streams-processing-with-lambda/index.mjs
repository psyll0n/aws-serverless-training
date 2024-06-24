import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });

export const handler = async (event) => {
  try {
    const recordsProcessed = event.Records.map(async (record) => {
      console.log("Stream record: ", JSON.stringify(record));

      if (record.eventName === "REMOVE") {
        const putItemCmd = new PutItemCommand({
          TableName: "sls-notes-archive",
          Item: record.dynamodb.OldImage,
        });

        return ddbClient.send(putItemCmd);
      }
    });

    await Promise.all(recordsProcessed);
    console.log(`Successfully processed ${event.Records.length} records.`);
    return `Successfully processed ${event.Records.length} records.`;
  } catch (err) {
    console.log("Error occured: ", err);
    throw err;
  }
};
