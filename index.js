import Arweave from "arweave";
import fs from "fs";
import crypto from "crypto";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const TEST_TX_ID = "aQV624S9ATcH9fSYXZk7CRU-B1ii7gXkimamAJ-ekS0";

(async () => {
  // const walletKey = JSON.parse(await fs.readFileSync("keyfile.json", "utf8"));

  // const walletAddresss = await arweave.wallets.jwkToAddress(walletKey);
  // const walletBalance = await arweave.wallets.getBalance(walletAddresss);

  // console.log({ walletAddresss, walletBalance });

  // const data = "hello world";
  // const tx1 = await arweave.createTransaction({ data }, walletKey);
  // const threadId = crypto
  //   .createHash("sha256")
  //   .update(Date.now().toString())
  //   .update(tx1.owner)
  //   .digest("hex");

  // console.log({ threadId });
  // tx1.addTag("Thread-id", threadId);

  // await arweave.transactions.sign(tx1, walletKey);
  // await arweave.transactions.post(tx1);

  // await waitForConfirmation(tx1.id);

  // const newData = "hellooooo wooooorld";
  // const tx2 = await arweave.createTransaction({ data: newData }, walletKey);
  // tx2.addTag("Thread-id", threadId);

  // await arweave.transactions.sign(tx2, walletKey);
  // await arweave.transactions.post(tx2);

  // await waitForConfirmation(tx2.id);

  const data = await arweave.transactions.getData(
    "ZfJBjsqdAxpPuMLm8iPLKYvIUPAvcOUUwtEYmiWbIMI",
    {
      decode: true,
      string: true,
    }
  );
  console.log(data);
})();

async function waitForConfirmation(txId) {
  let isConfirmed = false;
  while (!isConfirmed) {
    const txStatus = await arweave.transactions.getStatus(txId);
    isConfirmed = txStatus.status === 200;
    console.log({ txStatus });
    await new Promise((resolve) => setTimeout(resolve, 10_000));
  }
}

const txQuery = `query Transaction {
  transactions(tags: [{name: "Thread-id", values: ["b31731fb287cd0493597be0427ad6ff9e5a8cc1205299b564911d2c1459a2764"], op: EQ}]){
    edges {
      cursor 
      node {
        id
        owner {
          address
          key
        }
      }
    }
  }
}`;
