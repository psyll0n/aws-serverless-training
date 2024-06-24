// Synchronous function template
// exports.handler = (event, context, callback) => {
//     ...
//     callback(null, result);
// };

// Asynchronous function execution template
// exports.handler = (event, context) => {
//     return newImage;
// };

// Typical asynchronous function execution that returns a promise
// const resizeImage = (data) => new Promise((resolve, reject) => {
//     ...
//     ...
//     if (error) {
//         reject(error);
//     } else {
//         resolve(result);
//     }
//     resolve(result);
// });

// Various context object/parameter properties are available
// exports.handler = async (event, context) => {
//     context.getRemainingTimeInMillis();
//     context.functionName;
//     context.functionVersion;
//     context.invokedFunctionArn;
//     context.memoryLimitInMB;
//     context.awsRequestId;
//     context.identity;
//     context.logGroupName;
// }

// Lambda Error handling
// exports.handler = async (event, context) => {
//     console.error("An error occurred!");
//     console.log("Example log message...");
//     console.info("An informative message...");
//     console.warn("A warning message...");
// };

import moment from 'moment';
const greeting = {
    "en": "Hello",
    "fr": "Bonjour",
    "hi": "Namaste",
    "es": "Hola",
    "pt": "Ola",
    "ur": "Assalamo aleikum",
    "it": "Ciao",
    "de": "Hallo",
    "ar": "Ahlan"
}

export const handler = async (event) => {
    let name = event.pathParameters.name;
    let {lang, ...info} = event.queryStringParameters || {};

    let message = `${greeting[lang] ? greeting[lang] : greeting['en'] } ${name}`;
    let response = {
        message: message,
        info: info,
        timestamp: moment().unix()
    }
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
}