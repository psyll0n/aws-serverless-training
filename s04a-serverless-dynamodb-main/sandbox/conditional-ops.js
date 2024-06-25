const AWS = require('aws-sdk');
AWS.config.update({ region: 'eu-central-1' });

const docClient = new AWS.DynamoDB.DocumentClient();

// Conditional write table operation
const params = {
          TableName: 'tf_notes',
          Item: {
                    user_id: 'abc123df',
                    timestamp: '1719316699',
                    cat: 'general',
                    title: 'Conditional put example note title..',
                    note_id: '13051fsd',
                    content: 'Conditional write table operation note content..',
          },
          ConditionExpression: 'attribute_not_exists(#t) OR #t < :t',
          ExpressionAttributeNames: {
                    '#t': 'timestamp'
          },
          ExpressionAttributeValues: {
                    ':t': '1719316699'
          }
};

docClient.put(params, (err, data) => {
          if (err) {
                    if (err.name === 'ConditionalCheckFailedException') {
                              console.log("Conditional check failed: Item already exists or has a newer timestamp");
                    } else {
                              console.log("Error", err);
                    }
          } else {
                    console.log("Success", data);
          }
});