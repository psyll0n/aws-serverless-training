"use strict";

export const add = async (event, context) => {
  const { num1, num2 } = JSON.parse(event.body);

  const output = {
    num1: num1,
    num2: num2,
    result: num1 + num2,
    info: `The sum is ${num1 + num2}`,
  };

  console.log(output);

  return {
    statusCode: 200,
    body: JSON.stringify(output),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
