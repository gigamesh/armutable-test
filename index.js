import ArLocal from 'arlocal';
import armutable from 'armutable';
import Arweave from 'arweave';
import axios from 'axios';
import fs from 'fs';

const ARWEAVE_PORT = 1984;
const LOGGING = false;

const arweave = Arweave.init({
  host: "localhost",
  port: ARWEAVE_PORT,
  protocol: "http",
  timeout: 20000,
  logging: false,
});

(async () => {
  const arLocal = new ArLocal.default(ARWEAVE_PORT, LOGGING);
  await arLocal.start();

  const walletKey = await arweave.wallets.generate();
  const walletAddresss = await arweave.wallets.jwkToAddress(walletKey);

  // Fund wallet
  await axios.get(
    `http://localhost:${ARWEAVE_PORT}/mint/${walletAddresss}/100000000`
  );
  const walletBalance = await arweave.wallets.getBalance(walletAddresss);

  console.log({ walletBalance });

  // create a new "thread"
  const myFile = fs.readFileSync("myfile.txt").toString();
  const threadId = await armutable.newThread(arweave, myFile, walletKey);

  console.log({ threadId });

  const newData = `hellow woorrrrld!`;

  const updatedTxId = await armutable.updateThread(
    arweave,
    threadId,
    newData,
    walletKey
  );

  console.log({ updatedTxId });

  const updatedData = await armutable.readThread(arweave, threadId);

  console.log({ updatedData });

  await arLocal.stop();
})();
