/// <reference types="node" />
import { ethers } from "ethers";
//import * as fs from "fs-extra"
import * as fs from "fs";
import "dotenv/config";

async function main() {
  //const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  const abi = fs.readFileSync("./hh.abi.json", "utf8");

  // The smart contract address
  // hh:
  // 0xB53E086fE5363821519443927775Bfe022689129

  // ethers:
  // 0x5975C93FC89073665092076e472183a064F80ff6
  // 0x130Ec64CFD79Be33241fAE3b45a93a531cF6C4b0
  const contractAddress = "0xB53E086fE5363821519443927775Bfe022689129";
  const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);
  //const contract = new ethers.Contract(contractAddress, abi, provider);
  const contract = new ethers.Contract(contractAddress, abi, wallet);
  let response = await (contract as ethers.Contract).retrieve();
  console.log(`currNum: ${response}`);
  console.log("update favoriteNumber...");
  const txResponse = await (contract as ethers.Contract).store(
    response + BigInt(77)
  );
  const txReceipt = await txResponse.wait(1);
  response = await (contract as ethers.Contract).retrieve();
  console.log(`number updated: ${response}`);
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
