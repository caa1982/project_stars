const web3 = require("./web3Connection");
const abiFactory = require("../ABI/TokenFactory.json");
const abiToken = require("../ABI/Token.json");

exports.factory = new web3.eth.Contract(abiFactory, "0x0682c92bacb5f5b3d24d8e5dc7a2425b2f5d4ce8"); 

exports.token = (address) => new web3.eth.Contract(abiToken, address); 