const armutable = require("armutable");
const Arweave = require("arweave");
const fs = require("fs");
const { default: TestWeave } = require("testweave-sdk");

const arweave = Arweave.init({
  host: "localhost",
  port: 1984,
  protocol: "http",
  timeout: 20000,
  logging: false,
});

TestWeave.init(arweave).then(async (testWeave) => {
  // create a new "thread"
  const myFile = fs.readFileSync("myfile.txt").toString();
  const txId = await armutable.newThread(arweave, myFile, testWeave.rootJWK);
  // create a thread from a file already on arweave

  const threadId = await armutable.threadFromTX(
    arweave,
    txId,
    testWeave.rootJWK
  );

  console.log({ threadId });

  const newData = `hellow woorrrrld!`;

  const updatedTxId = await armutable.updateThread(
    arweave,
    threadId,
    newData,
    testWeave.rootJWK
  );

  console.log({ updatedTxId });
});
