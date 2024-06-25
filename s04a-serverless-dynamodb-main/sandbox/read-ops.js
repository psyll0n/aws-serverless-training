const AWS = require('aws-sdk');
AWS.config.update({region: 'eu-central-1'});

const docuClient = new AWS.DynamoDB.DocumentClient();

// DynamoDB - table entry read operation

// docuClient.get({
//     TableName: 'tf_notes',
//     Key: {
//         user_id: 'jklmg201',
//         timestamp: '1719316067'
//     }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });

// Table query operation example

// docuClient.query({
//           TableName: 'tf_notes',
//           KeyConditionExpression: 'user_id = :uid',
//           ExpressionAttributeValues: { ':uid': 'jklmg201' }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// Table scan operation example

// docuClient.scan({
//     TableName: 'tf_notes',
//     FilterExpression: 'cat = :cat',
//     ExpressionAttributeValues: { ':cat': 'general' }
// }, (err, data) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// })

// Batch table read operation example

docuClient.batchGet({
    RequestItems: {
        'tf_notes': {
            Keys: [
                {
                    user_id: '8ghd89j7',
                    timestamp: '1719305459'
                },
                {
                    user_id: '2346jhfd',
                    timestamp: '1719305570'
                }
            ]
        }
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
})