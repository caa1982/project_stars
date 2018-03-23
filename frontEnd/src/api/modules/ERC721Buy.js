const web3 = require("./web3Connection");
const abi = require("./ABI/abiBuy.json");

module.exports = new web3.eth.Contract(abi, "0x1abe1ea97b1b49bec6dab42a0ff64705af9c74d0");