import { network } from "hardhat";
import { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } from "../helper-hardhat-config";
import { verify } from "../helper-functions";
import { DeployFunction } from "hardhat-deploy/types";

// arguments come from hardhat-deploy
const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  if (!chainId) return;

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS;

  log(`----------------------------------------------------`);
  const myContract = await deploy("MyContract", {
    from: deployer,
    args: [5],
    log: true,
    waitConfirmations: waitBlockConfirmations,
    skipIfAlreadyDeployed: true,
  });

  // Verify the deployment
  if (!developmentChains.includes(network.name) && process.env.LOCAL_ETHERSCAN_API_KEY) {
    log("Verifying...");
    await verify(myContract.address, [5]);
  }

  log("----------------------------------------------------");
};
// deployFunction.skip = async (hre) => true;
export default deployFunction;
deployFunction.tags = [`all`, `myContract`, `main`];
// tags can be used with hardhat-deploy and hardhat.config to customize things
