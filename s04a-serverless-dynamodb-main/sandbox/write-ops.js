const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

const docuClient = new AWS.DynamoDB.DocumentClient();

// Add an entry to the 'tf_notes' DynamoDB table

// docuClient.put({
//           TableName: "tf_notes",
//           Item: {
//               user_id: "bb12tjk6",
//               timestamp: "1719314908",
//               cat: "general",
//               title: "Custom note title..",
//               note_id: "78fgdk5sd",
//               content: "Example note content"
//           }
// }, (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });

// Update an existing entry in the DynamoDB table

// docuClient.update({
//     TableName: "tf_notes",
//     Key: {
//         user_id: "bb12tjk6",
//         timestamp: "1719314908"
//     },
//     UpdateExpression: "set #t = :t",
//     ExpressionAttributeNames: {
//         "#t": "title"
//     },
//     ExpressionAttributeValues: {
//         ":t": "Updated title"
//     }
// }, (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });

// Delete an existing database entry in the 'tf_notes' DynamoDB table

// docuClient.delete({
//     TableName: "tf_notes",
//     Key: {
//         user_id: "bb12tjk6",
//         timestamp: "1719314908"
//     }
// }, (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });

// DynamoDB batch table operations example

// docuClient.batchWrite({
//     RequestItems: {
//         "tf_notes": [
//             {
//                 DeleteRequest: {
//                     Key: {
//                         user_id: "65j38dj3",
//                         timestamp: "1719315709"
//                     }
//                 }
//             },
//             {
//                 PutRequest: {
//                     Item: {
//                         user_id: "bb12tjk6",
//                         timestamp: "1719314908",
//                         cat: "general",
//                         title: "Updated title",
//                         note_id: "78fj89dc",
//                         content: "Example batch write note content"
//                     }
//                 }
//             },
//             {
//                 PutRequest: {
//                     Item: {
//                         user_id: "jklmg201",
//                         timestamp: "1719316067",
//                         cat: "general",
//                         title: "Sample Batch Write note title",
//                         note_id: "90rfdkws",
//                         content: "Second batch write note content"
//                     }
//                 }
//             }
//         ]
//     }
// }, (err, data) => {
//     if (err) {
//         console.log("Error", err);
//     } else {
//         console.log("Success", data);
//     }
// });