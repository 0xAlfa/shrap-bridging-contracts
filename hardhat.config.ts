require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("@openzeppelin/hardhat-upgrades");
require("hardhat-deploy");
require("solidity-coverage");
require("hardhat-gas-reporter");
require("hardhat-contract-sizer");
require("hardhat-abi-exporter");
require("dotenv").config();
require("@nomicfoundation/hardhat-network-helpers");


const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FORKING_BLOCK_NUMBER = process.env.FORKING_BLOCK_NUMBER;
const REPORT_GAS = process.env.REPORT_GAS || false;

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;
const POLYGON_API_KEY = process.env.POLYGON_API_KEY;

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    fantomTestnet: {
      url: "https://ftm.getblock.io/01ad4c6d-8ae5-420a-ae27-b3a43c5401a4/testnet/",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 4002,
    },
    fantom: {
      url: "https://ftm.getblock.io/01ad4c6d-8ae5-420a-ae27-b3a43c5401a4/mainnet/",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 250,
    },
    kava: {
      url: "https://evm.kava.io",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 2222,
    },
    kavaTestnet: {
      url: "https://evm.testnet.kava.io",
      accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
      saveDeployments: true,
      chainId: 2221,
    },
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 500,
      },
    },
  },
  etherscan: {
    apiKey: {
      kava: "api key is not required by the Kava explorer, but can't be empty",
      kavaTestnet: "api key is not required by the Kava explorer, but can't be empty",
      opera: "JNDFSZ52CGQKZ25P1S9G83HQ6S698QPGGX",
      ftmTestnet: "JNDFSZ52CGQKZ25P1S9G83HQ6S698QPGGX",
    },
    customChains: [
      {
        network: 'kava',
        chainId: 2222,
        urls: {
          apiURL: 'https://explorer.kava.io/api',
          browserURL: 'https://explorer.kava.io',
        },
      },
      {
        network: 'kavaTestnet',
        chainId: 2221,
        urls: {
            apiURL: 'https://evm.testnet.kava.io',
            browserURL: 'https://explorer.testnet.kava.io',
        },
      }
    ],
  },
  gasReporter: {
    enabled: REPORT_GAS,
    outputFile: "gas-report.txt",
    noColors: true,
  },
  contractSizer: {
    runOnCompile: false,
    only: [],
  },
  mocha: {
    timeout: 200000,
  },
};
