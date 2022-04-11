import { ADDRESS_ZERO } from './../helper-hardhat-config';
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat';

const setupGovernanceContracts: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  const timeLock = await ethers.getContract("TimeLock", deployer)
  const governanceContract = await ethers.getContract("GovernanceContract", deployer)

  log("Setting up roles...")
  const proposerRole = await timeLock.PROPOSER_ROLE()
  const executorRole = await timeLock.EXECUTOR_ROLE()
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE()

  const proposerTx = await timeLock.grantRole(proposerRole, governanceContract.address)
  await proposerTx.wait(1)

  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO)
  await executorTx.wait(1)

  const revokeTx = await timeLock.revokeRole(adminRole, deployer)
  await revokeTx.wait(1)

  // log("Deploying Setup Governance Contracts...")

  // const governanceContracts = await deploy("TimeLock", {
  //   from: deployer,
  //   args: [MIN_DELAY, [], []],
  //   log: true,
  //   // waitConfirmations: true
  // })

  // log(`Deployed TimeLock to address: ${governanceContracts.address}`)
}

export default setupGovernanceContracts
