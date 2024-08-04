/// <reference types="node" />
import { ethers, run, network } from "hardhat";

async function main() {
  const factory = await ethers.getContractFactory("SimpleStorage");
  console.log("deploying contract ...");
  const simpleStorage = await factory.deploy();
  const address = await simpleStorage.getAddress();
  console.log("simpleStorage: ", simpleStorage, address);
  if (network.config.chainId === 11155111) {
    simpleStorage.deploymentTransaction()?.wait(1);
    await verify(address, []);
  }
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
