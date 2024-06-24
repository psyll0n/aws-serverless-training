import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";

const lambdaClient = new LambdaClient({
  region: "us-east-1",
  endpoint: "http://127.0.0.1:3001",
});

const payload = JSON.stringify({
  stageVariables: {
    baz: "qux",
  },
});

const params = {
  FunctionName: "HelloWorldFunction",
  InvocationType: "RequestResponse",
  Payload: payload,
};

try {
  const invokeCmd = new InvokeCommand(params);
  const response = await lambdaClient.send(invokeCmd);

  const responsePayload = JSON.parse(Buffer.from(response.Payload).toString());

  console.log(`InvokeCommand response: ${JSON.stringify(response, null, 2)}`);
  console.log(
    `InvokeCommand response.Payload: ${JSON.stringify(
      responsePayload,
      null,
      2
    )}`
  );
} catch (error) {
  console.lof(`Error occured: ${error}`);
}
