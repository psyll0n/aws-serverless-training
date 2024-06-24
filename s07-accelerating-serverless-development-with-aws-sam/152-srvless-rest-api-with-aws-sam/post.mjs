import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

const tableName = process.env.TABLE_NAME;

export const handler = async (event) => {
  const userid = event.pathParameters.userid;
  const { firstName, lastName, email, website } = JSON.parse(event.body);

  const item = {
    userid: userid,
    firstName: firstName,
    lastName: lastName,
    email: email,
    website: website,
  };

  try {
    const putCmd = new PutCommand({
      TableName: tableName,
      Item: item,
    });

    const data = await ddbDocClient.send(putCmd);
    console.log(`PutCommand response: ${JSON.stringify(data, null, 2)}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data inserted/updated successfully" }),
    };
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
};
