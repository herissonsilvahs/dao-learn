import {
  QUORUM_PERCENT,
  VOTING_DELAY,
  VOTING_PERIOD,
} from "./../helper-hardhat-config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployGovernanceContract: DeployFunction = async (
  hre: HardhatRuntimeEnvironment
) => {
  const { getNamedAccounts, deployments, network } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();

  log("Deploying Governance Contract...");

  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  const governanceContract = await deploy("GovernanceContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENT,
    ],
    log: true,
    // waitConfirmations: true
  });

  log(`Deployed GovernanceContract to address: ${governanceContract.address}`);
};

export default deployGovernanceContract;
