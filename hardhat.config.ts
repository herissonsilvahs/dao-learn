import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers';
import '@typechain/hardhat';
import { HardhatUserConfig } from 'hardhat/config';

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const config:HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: "0.8.8",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      chainId: 31337
    }
  },
  namedAccounts: {
    deployer: {
      default: 0
    }
  }
}

export default config
