import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  const userid = event.pathParameters.userid;

  try {
    const deleteCmd = new DeleteCommand({
      TableName: tableName,
      Key: {
        userid: userid,
      },
    });

    const response = await ddbDocClient.send(deleteCmd);
    console.log(`DeleteCommand response: ${JSON.stringify(response, null, 2)}`);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User deleted successfully",
      }),
    };
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
};
