require("@nomicfoundation/hardhat-toolbox");

require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-ignition-ethers');
const privateKey = 'fe2403170f47513988cc66e36fc6755f4366e4a921a7196f2c4e614bfb757ebd';
module.exports = {
  solidity: "0.8.24",
  networks: {
    moonbase: {
      url: 'https://rpc.api.moonbase.moonbeam.network',
      chainId: 1287,
      accounts: [privateKey],
    },
  }
};
