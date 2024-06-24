import {
  DynamoDBClient,
  ListTablesCommand,
  DescribeTableCommand,
  CreateTableCommand,
  UpdateTableCommand,
  DeleteTableCommand,
} from "@aws-sdk/client-dynamodb";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });

try {
  const listTablesCmd = new ListTablesCommand({});
  const response = await dynamoDBClient.send(listTablesCmd);
  console.log(
    `ListTablesCommand response: ${JSON.stringify(response, null, 2)}`
  );

  /* const describeTableCmd = new DescribeTableCommand({
    TableName: "td_notes",
  });
  const response = await dynamoDBClient.send(describeTableCmd);
  console.log(
    `DescribeTableCommand response: ${JSON.stringify(response, null, 2)}`
  ); */

  /* const createTableCmd = new CreateTableCommand({
    TableName: "td_notes_sdk",
    AttributeDefinitions: [
      { AttributeName: "user_id", AttributeType: "S" },
      { AttributeName: "timestamp", AttributeType: "N" },
    ],
    KeySchema: [
      { AttributeName: "user_id", KeyType: "HASH" },
      { AttributeName: "timestamp", KeyType: "RANGE" },
    ],
    ProvisionedThroughput: { ReadCapacityUnits: 1, WriteCapacityUnits: 1 },
  });
  const response = await dynamoDBClient.send(createTableCmd);
  console.log(
    `CreateTableCommand response: ${JSON.stringify(response, null, 2)}`
  ); */

  /* const updateTableCmd = new UpdateTableCommand({
    TableName: "td_notes_sdk",
    ProvisionedThroughput: { ReadCapacityUnits: 2, WriteCapacityUnits: 1 },
  });
  const response = await dynamoDBClient.send(updateTableCmd);
  console.log(
    `UpdateTableCommand response: ${JSON.stringify(response, null, 2)}`
  ); */

  /*  const deleteTableCmd = new DeleteTableCommand({ TableName: "td_notes_sdk" });
  const response = await dynamoDBClient.send(deleteTableCmd);
  console.log(
    `DeleteTableCommand response: ${JSON.stringify(response, null, 2)}`
  ); */
} catch (error) {
  console.log(`Error occured: ${error}`);
} finally {
  dynamoDBClient.destroy();
}

// dynamodb.deleteTable({
//     TableName: "td_notes_sdk"
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });
