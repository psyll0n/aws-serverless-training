import { faker } from "@faker-js/faker";
import moment from "moment";
import { KinesisClient, PutRecordCommand } from "@aws-sdk/client-kinesis";

const kinesisClient = new KinesisClient({ region: "us-east-1" });

const generateNotesItem = () => {
  return {
    user_id: faker.string.uuid(),
    timestamp: moment().unix(),
    cat: faker.word.noun(),
    title: faker.company.catchPhrase(),
    content: faker.hacker.phrase(),
    note_id: faker.string.uuid(),
    user_name: faker.internet.userName(),
    expires: moment().unix() + 600,
  };
};

setInterval(async () => {
  try {
    const data = generateNotesItem();

    const putRecordCmd = new PutRecordCommand({
      Data: Buffer.from(JSON.stringify(data)),
      PartitionKey: "P1",
      StreamName: "ServerlessNotesStream",
    });

    const response = await kinesisClient.send(putRecordCmd);

    console.log(`Data: ${JSON.stringify(data, null, 2)}`);
    console.log(`Response: ${JSON.stringify(response, null, 2)}`);
    console.log();
  } catch (err) {
    throw err;
  }
}, 1000);
