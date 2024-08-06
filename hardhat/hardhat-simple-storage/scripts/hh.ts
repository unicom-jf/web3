/// <reference types="node" />
import { ethers, run, network } from "hardhat";
import * as fs from "fs";

async function main() {
  // The smart contract address
  // hh:
  // 0xB53E086fE5363821519443927775Bfe022689129

  // ethers:
  // 0x5975C93FC89073665092076e472183a064F80ff6
  // 0x130Ec64CFD79Be33241fAE3b45a93a531cF6C4b0
  const contractAddress = "0x5690701C321ABE6648D9ae2047B7cFe8929631Cb";
  //function getContractAt(abi: any[], address: string, signer?: ethers.Signer);
  const accounts = await ethers.getSigners();
  console.log("accounts: ", accounts);
  //const abi = fs.readFileSync("./hh.abi.json", "utf8");
  const contract = await ethers.getContractAt(
    //abi,
    "SimpleStorage",
    contractAddress,
    accounts[0]
  );
  let currentValue = await contract.retrieve();
  console.log(`Current value: ${currentValue}`);

  // Update the value
  console.log("Updating contract...");
  let transactionResponse = await contract.store(currentValue + BigInt(7));
  await transactionResponse.wait(); // returns transaction receipt
  currentValue = await contract.retrieve();
  console.log(`Current value: ${currentValue}`);
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
