import { DeployFunction } from "hardhat-deploy/dist/types";

const DICIMALS = 18;
const INITIAL_PRICE = "2000000000000000000000";
const deployMocks: DeployFunction = async (hre) => {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = await getChainId();
  if (chainId === "31337") {
    log("deploying mocks...");
    await deploy("MockV3Aggregator", {
      contract: "MockV3Aggregator",
      from: deployer,
      args: [DICIMALS, INITIAL_PRICE],
      log: true,
    });
    log("mocks deployed.");
    log("----------------------");
  }
};
export default deployMocks;
deployMocks.tags = ["all", "mocks"];
