import { DeployFunction } from "hardhat-deploy/dist/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
//const deployFunc: DeployFunction = async function (hre) {
const deployFunc: DeployFunction = async function ({
  getNamedAccounts,
  deployments,
  getChainId,
}) {
  //const { getNamedAccounts, deployments, getChainId } = hre;
  const { deployer } = await getNamedAccounts();
  const { deploy, log } = deployments;
  const chainId = await getChainId();
  console.log(deployer, chainId);

  //let feedAddress: string;
  let feedAddress: string;
  if (chainId === "31337") {
    const aggrator = await deployments.get("MockV3Aggregator");
    feedAddress = aggrator.address;
  } else {
    feedAddress = "";
  }
  log("----------------------------");
  log("deploying fundMe......");
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [feedAddress],
    log: true,
    waitConfirmations: 0,
  });
  log(`fundMe deployed at: ${fundMe.address}`);
  //console.log("deploying fundMe...");
};
export default deployFunc;
deployFunc.tags = ["all", "fundMe"];
