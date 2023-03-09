const express = require("express");
const cors = require("cors");
const {
  encryptWithPublicKey,
  decryptWithPrivateKey,
  cipher,
} = require("eth-crypto");

const app = express();
const port = 3000;
const host = "192.168.1.114";
app.use(express.json());

app.get("/encrypt", async (req, res) => {
  const { key, publicKey } = req.query;
  try {
    const encryptedKey = await encryptWithPublicKey(publicKey, key);
    const str = cipher.stringify(encryptedKey);
    res.send(str);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error encrypting key");
  }
});

app.get("/decrypt", async (req, res) => {
  const { key, privateKey } = req.query;
  try {
    const str = cipher.parse(key);
    const decryptedKey = await decryptWithPrivateKey(privateKey, str);
    res.send(decryptedKey);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error encrypting key");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://${host}:${port}`);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
