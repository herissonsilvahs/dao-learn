import { MIN_DELAY } from './../helper-hardhat-config';
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'

const deployTimeLock: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying Time Lock...")

  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // waitConfirmations: true
  })

  log(`Deployed TimeLock to address: ${timeLock.address}`)
}

export default deployTimeLock