import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-etherscan";
import "@nomiclabs/hardhat-waffle";
import "@nomiclabs/hardhat-ethers";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import "hardhat-deploy";
import "hardhat-abi-exporter";

dotenv.config();

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MAINNET_URL || "",
        blockNumber: 14763855,
        enabled: false,
      },
      chainId: 31337,
    },
    localhost: {
      chainId: 31337,
    },
    mumbai: {
      url: process.env.MUMBAI_URL || "",
      accounts: process.env.LOCAL_PRIVATE_KEY !== undefined ? [process.env.LOCAL_PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 80001,
    },
    kovan: {
      url: process.env.KOVAN_URL || "",
      accounts: process.env.LOCAL_PRIVATE_KEY !== undefined ? [process.env.LOCAL_PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 42,
    },
    rinkeby: {
      url: process.env.RINKEBY_URL || "",
      accounts: process.env.LOCAL_PRIVATE_KEY !== undefined ? [process.env.LOCAL_PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 4,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.LOCAL_ETHERSCAN_API_KEY,
      kovan: process.env.LOCAL_ETHERSCAN_API_KEY,
      polygon: process.env.POLYGONSCAN_ETHERSCAN_API_KEY,
    },
  },
  abiExporter: [
    {
      path: "./data/abi/pretty",
      runOnCompile: true,
      clear: true,
      spacing: 2,
      pretty: true,
      only: [],
    },
    {
      path: "./data/abi/ugly",
      runOnCompile: true,
      clear: true,
      spacing: 2,
      pretty: false,
      only: [],
    },
  ],
  mocha: {
    timeout: 200000, // 200 seconds max for running tests
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v5",
  },
  solidity: {
    compilers: [
      { version: "0.8.4" },
      { version: "0.4.24" },
      { version: "0.6.6" },
      { version: "0.7.6" },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
