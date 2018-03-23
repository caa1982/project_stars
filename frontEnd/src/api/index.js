import axios from 'axios'
import Vue from 'vue'
import ERC721 from './modules/ERC721.js'
import ERC721Buy from './modules/ERC721Buy.js'
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
     console.log('cart: ', cart[0].smartContractId);

    const address = await web3Connection.eth.getAccounts();

    Promise.all(cart.map(el => {
        
        const exist = ERC721.methods.tokenDetailsOf(el.smartContractId).call({from: String(address)})
       
        
        return exist;
        
    })).then(exist => {
        
        exist.map( (el, index) => {
            el[0] != 0 ? cart[index].exist = true: cart[index].exist = false; 
        })

        const mint = cart.filter(el => el.exist === false)
        const buy = cart.filter(el => el.exist === true)
        console.log('buy: ', mint);
        
        if(buy.length != 0) {
            //buyTokens(buy);
        }

        if(mint.length != 0) {
            mintTokens(mint);
        }
        

    });
    
    const details = (arr) => {
        const tokensId = arr.map(el=> Number(el.smartContractId));
        const objects = arr.map(el=> web3Connection.utils.asciiToHex(el.object));
        const newPrice = arr.map(el=> Number(el.newPrice));
        const tokensName = arr.map(el=> web3Connection.utils.asciiToHex(el.name.toLowerCase()));
        const amountToPay = web3Connection.utils.toWei(String(arr.reduce((acc, el) => acc + el.price, 0)), "ether");

        return {tokensId, objects, newPrice, tokensName, amountToPay}
    }
    const mintTokens = (mint) => {
        const get = details(mint);
        ERC721Buy.methods
        .mintTokens(get.tokensId, get.objects, get.newPrice, get.tokensName)
        .send({ from: String(address) , value: get.amountToPay });

    }

    const buyTokens = (buy) => {
        const get = details(buy);

        ERC721Buy.methods
        .buyTokens(get.tokensId, get.newPrice)
        .send({ from: String(address) , value: get.amountToPay });

    }
    
 }
}

// ERC721Buy.methods.mintTokens([15,16], [web3Connection.utils.asciiToHex("star"), web3Connection.utils.asciiToHex("star")], [500,  500], [web3Connection.utils.asciiToHex("hd1"), web3Connection.utils.asciiToHex("hd3")]).send({ from: String(address) , value: web3Connection.utils.toWei(String(0.3), "ether") });