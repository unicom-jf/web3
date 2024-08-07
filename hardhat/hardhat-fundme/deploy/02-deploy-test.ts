import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
const deployFuncTest: DeployFunction = async function (hre) {
  console.log("deploying fundTest...");
};
export default deployFuncTest;
deployFuncTest.tags = ["all", "fundTest"];
