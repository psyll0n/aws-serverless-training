import async from "async";
import _ from "underscore";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const ddbClient = new DynamoDBClient({ region: "us-east-1" });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient);

let startKey = [];
let results = [];
let pages = 0;

try {
  async.doWhilst(
    //iteratee
    async (callback) => {
      let params = {
        TableName: "td_notes",
        Limit: 2,
      };

      if (!_.isEmpty(startKey)) {
        params.ExclusiveStartKey = startKey;
      }

      try {
        const scanCmd = new ScanCommand(params);
        const response = await ddbDocClient.send(scanCmd);

        if (typeof response.LastEvaluatedKey !== "undefined") {
          startKey = response.LastEvaluatedKey;
        } else {
          startKey = [];
        }

        if (!_.isEmpty(response.Items)) {
          results = _.union(results, response.Items);
        }

        pages++;

        console.log(`***`);
        console.log(`async.doWhilst iteratee, page=${pages}`);
        console.log(
          `async.doWhilst iteratee, results=${JSON.stringify(
            response.Items,
            null,
            2
          )}`
        );

        return results;
      } catch (error) {
        throw error;
      }
    },

    //truth test
    (results, callback) => {
      if (_.isEmpty(startKey)) {
        return callback(null, false);
      } else {
        return callback(null, true);
      }
    },

    //callback
    (error, data) => {
      if (error) {
        console.log(`async.doWhilst callback, error occured: ${error}`);
      } else {
        console.log(`=======`);
        console.log(`Final data: ${JSON.stringify(data, null, 2)}`);
        console.log("Number of items: ", data.length);
        console.log("Number of pages: ", pages);
      }
    }
  );
} catch (error) {
  console.log(`Error occured: ${error}`);
} finally {
  ddbDocClient.destroy();
  ddbClient.destroy();
}
