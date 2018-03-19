import axios from 'axios'
import Vue from 'vue'
import instance from './modules/instance.js'
import web3Connection from './modules/web3Connection.js'
const baseUrl = "http://localhost:3000"

export default {
 getStars: (page, sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/stars/`, { page, sort, sortPrice })
    .then(result => {
    cb(result.data.data.docs)
        })
    .catch(console.log)
 },
 getPlanets: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planets`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getPlanetSatelites: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planetSatelites`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getDwarfPlanet: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/dwarfPlanet`, { sort, sortPrice })
    .then(result => {
    cb(result.data.data)
        })
    .catch(console.log)
 },
 getExoplanets: (page, image, sort, sortPrice, cb) => {
   axios.post(`${baseUrl}/exoplanets`, { page, image, sort, sortPrice })
   .then(result => {
   cb(result.data.data.docs)
       })
   .catch(console.log)
 },
 search: (search, cb) => {
     console.log('search: ', search);
   axios.post(`${baseUrl}/search`, { search })
   .then(result => {
   cb(result.data.data)
       })
   .catch(console.log)
 },
 getEthUsd: (cb) => {
   axios.get(`${baseUrl}/EthUsd`)
   .then(result => {
   cb(result.data.data)
       })
   .catch(console.log)
 },
 checkout: async (cart, cb) => {

    const address = await web3Connection.eth.getAccounts();

    cart.forEach(async (el, index) => {
        const exist = await instance.methods.tokenOwner(el.id).send({from: String(address)})
        
        exist != 0 ? cart[index].exist= true : cart[index].exist= false; 
    });
    
    const mint = cart.filter(el => el.exist === false);
    const buy = cart.filter(el => el.exist === true);

    let ethAmount;
    let tokenIds;
    let tokenObject;
    let tokenPrice;

    if(mint.length > 1){
        ethAmount = mint.reduce((acc, obj) => acc + obj.price, 0);
        tokenIds = mint.map(el => el.hd);
        tokenObject = mint.map(el => el.object);
        tokenPrice = mint.map(el => el.newPrice || el.price).map(el => web3Connection.utils.toWei(String(el), "ether"));
        //instance.methods.mintTokens(tokenIds, tokenObject, tokenPrice).send({ from: address , value: web3Connection.utils.toWei(ethAmount.toString(), "ether") });
    } else if (mint.length === 1) {
        ethAmount = mint.reduce((acc, obj) => acc + obj.price, 0);
        tokenIds = mint.map(el => el.hd);
        tokenObject = mint.map(el => el.object);
        tokenPrice = mint.map(el => el.newPrice || el.price).map(el => web3Connection.utils.toWei(String(el), "ether"));
        //instance.methods.mintTokens(tokenIds, tokenObject, tokenPrice).send({ from: address , value: web3Connection.utils.toWei(ethAmount.toString(), "ether") });
    }
    
    if(buy.length > 1) {
        ethAmount = buy.reduce((acc, obj) => acc + obj.price, 0);
        tokenIds = buy.map(el => el.hd);
        tokenPrice = buy.map(el => el.newPrice || el.price).map(el => web3Connection.utils.toWei(String(el), "ether"));
        //instance.methods.buyTokens(tokenIds, tokenPrice).send({ from: address , value: web3Connection.utils.toWei(ethAmount.toString(), "ether") });
    }else if (buy.length === 1) {
        tokenPrice = buy.map(el => el.newPrice || el.price).map(el => web3Connection.utils.toWei(String(el), "ether"));
        console.log('tokenPrice: ', tokenPrice);
        //instance.methods.buyToken(cart[0].id, web3Connection.utils.toWei(tokenPrice.toString(), "ether")).send({ from: address , value: web3Connection.utils.toWei(tokenPrice.toString(), "ether") });
    }
 }
}