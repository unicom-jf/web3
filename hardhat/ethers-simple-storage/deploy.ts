/// <reference types="node" />
import { ethers } from "ethers";
//import * as fs from "fs-extra"
import * as fs from "fs";
async function main() {
  //HTTP://127.0.0.1:7545
  const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
  const wallet = new ethers.Wallet(
    "0x9db32946ee85a961cc8bc841c75571ba1554777cdc1bf6c571ff0ffd1de62d0b",
    provider
  );
  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8");
  console.log(`abi: ${abi}`);
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  /*
  const contract = new ethers.Contract(
    "0x93487Ea2A944495a33F91262fb56D3e0505F92AB",
    abi,
    provider
  );
  */
  //const contract = new Contract(address, abi, provider);
  console.log("deploying..., please wait");
  /*

  const deploymentReceipt = await contract.deploymentTransaction()?.wait(1);
  const address = await contract.getAddress();
  console.log(`Contract deployed to ${address}`);
  */

  const contract = await contractFactory.deploy();
  const deploymentReceipt = await contract.deploymentTransaction()?.wait(1);
  const address = await contract.getAddress();
  console.log(`Contract deployed to ${address}`);

  let response = await //contract!.connect(signer!) as ethers.Contract
  (contract as ethers.Contract).retreive();
  console.log(`currNum: ${response}`);
  console.log("update favoriteNumber...");
  const txResponse = await (contract as ethers.Contract).store(77);
  const txReceipt = await txResponse.wait(1);
  response = await //contract!.connect(signer!) as ethers.Contract
  (contract as ethers.Contract).retreive();
  console.log(`currNum: ${response}`);
  /*
  const funcRetreive = contract.getFunction("retreive");
  const currNum = funcRetreive();
  */
}

main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
