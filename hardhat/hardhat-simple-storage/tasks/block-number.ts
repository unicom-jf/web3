import { task } from "hardhat/config";

export default task("block-number", "print block number", async (args, hre) => {
  const number = await hre.ethers.provider.getBlockNumber();
  console.log(`Current block number: ${number}`);
});
