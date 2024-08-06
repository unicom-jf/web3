/// <reference types="node" />
import { ethers, run, network } from "hardhat";
function sleep(milli_seconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milli_seconds));
}
async function main() {
  const factory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract ...");
  const simpleStorage = await factory.deploy();
  const address = await simpleStorage.getAddress();
  console.log("simpleStorage: ", simpleStorage, address);
  /*
  if (network.config.chainId === 11155111) {
    simpleStorage.deploymentTransaction()?.wait(1);
    await verify(address, []);
  }
  */
  //simpleStorage.deploymentTransaction()?.wait(3);
  console.log("sleep 10s ...");
  await sleep(10000);
  const accounts = await ethers.getSigners();
  //console.log("accounts: ", accounts);
  //const abi = fs.readFileSync("./hh.abi.json", "utf8");
  const contract = await ethers.getContractAt(
    //abi,
    "SimpleStorage",
    address,
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

async function verify(address: string, args: any[]) {
  console.log("Verifying contract ...");
  try {
    await run("verify:verify", {
      address: address,
      constructorArguments: args,
    });
  } catch (err: any) {
    if (err.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!");
    } else {
      console.error(err);
    }
  }
}
main()
  .then(() => {
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
