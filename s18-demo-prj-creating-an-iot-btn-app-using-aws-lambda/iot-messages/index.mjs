import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const snsClient = new SNSClient({ region: "us-east-1" });

const phone = process.env.phone;

const messages = {
  single: "I miss you!",
  double: "Missing you a lot!",
  long: "Missing you! Can't wait to see you!",
};

export const handler = async (event) => {
  console.log("Event Data:", JSON.stringify(event));
  let message = messages.single;

  if (event.clickType === "DOUBLE") {
    message = messages.double;
  } else if (event.clickType === "LONG") {
    message = messages.long;
  }

  const params = {
    PhoneNumber: phone,
    Message: message,
  };

  const publishCmd = new PublishCommand(params);

  const result = await snsClient.send(publishCmd);

  console.log("Message:", message);
  console.log("Result:", result);

  return result;
};
