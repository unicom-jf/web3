import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
const deployFunc: DeployFunction = async function (hre) {
  console.log("deploying fundMe...");
};
export default deployFunc;
deployFunc.tags = ["all", "fundMe"];
