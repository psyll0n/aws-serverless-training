import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({ region: "us-east-1" });

export const handler = async (event) => {
  const number = event.number;
  const payload = JSON.stringify({
    operation: "multiply",
    input: {
      operand1: number,
      operand2: number,
    },
  });

  const params = {
    FunctionName: "calculator",
    InvocationType: "RequestResponse",
    Payload: payload,
  };

  try {
    const invokeCmd = new InvokeCommand(params);

    const calculatorResponse = await lambdaClient.send(invokeCmd);

    console.log(
      `InvokeCommand response: ${JSON.stringify(calculatorResponse, null, 2)}`
    );

    const result = JSON.parse(
      Buffer.from(calculatorResponse.Payload).toString()
    );

    return result.body;
  } catch (error) {
    console.log(`Error occured: ${error}`);
  }
};
