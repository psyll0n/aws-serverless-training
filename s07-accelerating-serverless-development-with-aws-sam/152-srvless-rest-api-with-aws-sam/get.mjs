import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  const userid = event.pathParameters.userid;

  try {
    const getCmd = new GetCommand({
      TableName: tableName,
      Key: {
        userid: userid,
      },
    });

    const data = await ddbDocClient.send(getCmd);
    console.log(`GetCommand response: ${JSON.stringify(data, null, 2)}`);

    if (data.Item) {
      return {
        statusCode: 200,
        body: JSON.stringify(data.Item),
      };
    } else {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "User not found!" }),
      };
    }
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
};
