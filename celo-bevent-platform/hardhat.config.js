require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
/** @type import('hardhat/config').HardhatUserConfig */
const Pkey = process.env.REACT_APP_BEVENT_PRIVATE_KEY;
module.exports = {
  solidity: "0.8.18",
  networks: {
    hardhat: {},
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      network_id: 44787,                             // Alfajores network id
      accounts: ['0x46fb9d3f419a890b0e20d11a289976be9f482a766639754e60832985855a6c16']
    },
  },
};
