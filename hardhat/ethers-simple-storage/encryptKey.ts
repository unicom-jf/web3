import { ethers } from "ethers";
import "dotenv/config";
import * as fs from "fs";

async function main() {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!);
  const encryptedJson = await wallet.encrypt(process.env.PRIVATE_KEY_PASSWORD!);
  //console.log(encryptedJson);
  fs.writeFileSync("./encryptedKey.json", encryptedJson);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
