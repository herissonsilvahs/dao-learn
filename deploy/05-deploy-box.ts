import { MIN_DELAY } from './../helper-hardhat-config';
import { HardhatRuntimeEnvironment } from 'hardhat/types'
import { DeployFunction } from 'hardhat-deploy/types'
import { ethers } from 'hardhat';

const deployBox: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments, network } = hre
  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()

  log("Deploying Box...")

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations: true
  })

  const timeLock = await ethers.getContract('TimeLock')
  const boxContract = await ethers.getContractAt('Box', box.address)
  const transferOwnerTx = await boxContract.transferOwnership(
    timeLock.address
  )
  await transferOwnerTx.wait(1)

  log(`Deployed Box to address: ${box.address}`)
}

export default deployBox
