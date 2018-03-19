
const web3 = require("./web3Connection");
const abi = require("./ABI/abi.json");

module.exports = new web3.eth.Contract(abi, "0xEeBe61De9fdB4BcD4eC962BE5C8BcE9482A4893D"); 