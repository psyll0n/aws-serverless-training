// Import the AWS SDK
const AWS = require('aws-sdk');

// Configure the AWS SDK with the desired region
AWS.config.update({ region: 'eu-central-1' });

// Create a DynamoDB DocumentClient instance
const docClient = new AWS.DynamoDB.DocumentClient();

// Async function to scan the entire table
async function scanTable() {
          // Initialize variables for pagination
          let startKey = undefined;  // Will hold the key for the next page
          let results = [];  // Will store all retrieved items
          let pages = 0;  // Counter for the number of pages scanned

          // Continue looping until we've scanned all items
          do {
                    // Set up parameters for the scan operation
                    const params = {
                              TableName: 'tf_notes',  // The name of the table to scan
                              Limit: 3,  // Number of items to retrieve per page
                              ExclusiveStartKey: startKey  // Key to start the scan from (for pagination)
                    };

                    try {
                              // Perform the scan operation and await its completion
                              const data = await docClient.scan(params).promise();

                              // Add the retrieved items to our results array
                              results = results.concat(data.Items);

                              // Get the key for the next page, if any
                              startKey = data.LastEvaluatedKey;

                              // Increment the page counter
                              pages++;
                    } catch (err) {
                              // If an error occurs during the scan, log it and throw it
                              console.error("Error scanning table:", err);
                              throw err;
                    }
          } while (startKey);  // Continue if there's a key for the next page

          // Log the total number of items and pages
          console.log('Items:', results.length);
          console.log('Pages:', pages);

          // Return all retrieved items
          return results;
}

// Call the scanTable function and handle the result
scanTable()
          .then(data => console.log(data))  // If successful, log the data
          .catch(err => console.error(err));  // If an error occurs, log the error