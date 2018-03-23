
const web3 = require("./web3Connection");
const abi = require("./ABI/abi.json");

module.exports = new web3.eth.Contract(abi, "0xf8a7f2055d87e7d87bd39ce79bff44bdb7c119d9"); 