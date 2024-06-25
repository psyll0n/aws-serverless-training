const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});

const dynamodb = new AWS.DynamoDB();


// List all existing DynamoDB tables

dynamodb.listTables({}, (err, data) =>{
      if(err) {
          console.log(err);
      } else {
          console.log(data);
      }
});

// Describe DynamonoDB table with name 'tf_notes'

// dynamodb.describeTable({
//     TableName: 'tf_notes'
// },(err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });


// Create a new DynamoDB table

// dynamodb.createTable({
//           TableName: "td_notes_sdk",
//           AttributeDefinitions: [
//         {
//             AttributeName: 'user_id',
//             AttributeType: 'S'
//         },
//         {
//             AttributeName: 'timestamp',
//             AttributeType: 'N'
//         }
//     ],
//     KeySchema: [
//         {
//             AttributeName: 'user_id',
//             KeyType: 'HASH'
//         },
//         {
//             AttributeName: 'timestamp',
//             KeyType: 'RANGE'
//         }
//     ],
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 1,
//         WriteCapacityUnits: 1
//     }
// }, (err, data) =>{
//       if(err) {
//           console.log(err);
//       } else {
//           console.log(data);
//       }
// });

// Update a DynamoDB table capacity

// dynamodb.updateTable(
//   {
//     TableName: "td_notes_sdk",
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 2,
//       WriteCapacityUnits: 1,
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(JSON.stringify(data, null, 2));
//     }
//   }
// );


// Delete a DynamoDB table

// dynamodb.deleteTable({
//     TableName: 'td_notes_sdk'
// }, (err, data) => {
//     if(err) {
//         console.log(err);
//     } else {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

