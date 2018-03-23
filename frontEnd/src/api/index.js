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

    Promise.all(cart.map(el => {
        
        const exist = instance.methods.tokenDetailsOf(1).call({from: String(address)})
        
        return exist;
        
    })).then(exist => {
        
        exist.map( (el, index) => {
            web3Connection.utils.isAddress(el.tokenOwner) ? cart[index].exist = true: cart[index].exist = false; 
        })

        const mint = cart.filter(el => el.exist === false)
        const buy = cart.filter(el => el.exist === true)
        
        if(buy.length != 0) {
            buyTokens(buy);
        }

        if(mint.length != 0) {
            mintTokens(mint);
        }
        

    });

    let array = (array) => new Object ({
        name: array.map(el=> el.name),
        newPrice: array.map(el=> el.newPrice),
        price: array.map(el=> el.price),
        object: array.map(el=> el.object),
    })
    
    const mintTokens = (mint) => {
        const arr = array(mint);
        console.log('arr: ', arr);
        
        //instance.methods.mintTokens(arr.id, arr.object, arr.newPrice, arr.name).send({ from: address , value: web3Connection.utils.toWei(arr.price.toString(), "ether") });
    }

    const buyTokens = (buy) => {
        const arr = array(buy);
        //instance.methods.buyTokens(object.id, object.newPrice).send({ from: address , value: web3Connection.utils.toWei(ethAmount.toString(), "ether") });
    }
    
 }
}