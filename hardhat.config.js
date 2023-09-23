require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */


require("dotenv").config({ path: ".env" });

const FIL_HTTP_URL = process.env.FIL_HTTP_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    calibration: {
      url: FIL_HTTP_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};