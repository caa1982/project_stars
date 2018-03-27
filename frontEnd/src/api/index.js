import axios from 'axios'
import Vue from 'vue'
import ERC721 from './modules/ERC721.js'
import ERC721Buy from './modules/ERC721Buy.js'
import web3 from './modules/web3Connection.js'
import mergeByKey from "array-merge-by-key";
const baseUrl = "http://localhost:3000"

export default {
 getPortfolio: async (cb) => {
    const address = await web3.eth.getAccounts();

    const tokens = await ERC721.methods.tokensOf(address[0]).call()

    axios.post(`${baseUrl}/portfolio/`, { tokens })
    .then(result => {
        tokenDetails(result.data.data, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    }) 
 },
 getStars: (page, sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/stars/`, { page, sort, sortPrice })
    .then(result => {
        tokenDetails(result.data.data.docs, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data.docs, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    })
    .catch(console.log)
 },
 getPlanets: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planets`, { sort, sortPrice })
    .then(result => {
        tokenDetails(result.data.data, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    })
    .catch(console.log)
 },
 getPlanetSatelites: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/planetSatelites`, { sort, sortPrice })
    .then(result => {
        tokenDetails(result.data.data, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    })
    .catch(console.log)
 },
 getDwarfPlanet: (sort, sortPrice, cb) => {
    axios.post(`${baseUrl}/dwarfPlanet`, { sort, sortPrice })
    .then(result => {
        tokenDetails(result.data.data, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    })
    .catch(console.log)
 },
 getExoplanets: (page, image, sort, sortPrice, cb) => {
   axios.post(`${baseUrl}/exoplanets`, { page, image, sort, sortPrice })
   .then(result => {
        tokenDetails(result.data.data.docs, tokenDetails => {
            result = mergeByKey("smartContractId", result.data.data.docs, tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
    })
   .catch(console.log)
 },
 search: (search, cb) => {
   axios.post(`${baseUrl}/search`, { search })
   .then(result => {
        tokenDetails([result.data.data], tokenDetails => {
            result = mergeByKey("smartContractId", [result.data.data], tokenDetails).filter(el => el.smartContractId != 0)
            cb(result)
        })
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
    const address = await web3.eth.getAccounts();

    tokenDetails(cart, tokenDetails => {
      
        tokenDetails.map( (el, index) => {
            el.owner != 0 ? cart[index].exist = true: cart[index].exist = false; 
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
    
    const details = (arr) => {
        const tokensId = arr.map(el=> Number(el.smartContractId));
        const objects = arr.map(el=> web3.utils.asciiToHex(el.object));
        const newPrice = arr.map(el=> Number(el.newPrice));
        const tokensName = arr.map(el=> web3.utils.asciiToHex(el.name));
        const amountToPay = web3.utils.toWei(String(Math.round(arr.reduce((acc, obj) => acc + obj.price, 0)* 100)/100), "ether");

        return {tokensId, objects, newPrice, tokensName, amountToPay}
    }
    
    const mintTokens = (mint) => {
        const get = details(mint);
       
        ERC721Buy.methods
        .mintTokens(get.tokensId, get.objects, get.newPrice, get.tokensName)
        .send({ from: address[0], value: get.amountToPay })
        .on("receipt", receipt => cb(receipt));

    }

    const buyTokens = (buy) => {
        const get = details(buy);
        
        ERC721Buy.methods
        .buyTokens(get.tokensId, get.newPrice)
        .send({ from: address[0], value: get.amountToPay })
        .on("receipt", receipt => cb(receipt));
    }
    
 }
}

const tokenDetails = (array, cb) => {

  Promise.all(array.map(el => {

      let tokenDetails = ERC721.methods.tokenDetailsOf(el.smartContractId).call()
      
      return tokenDetails;
      
  })).then(tokenDetails => {

       tokenDetails = tokenDetails.map((el, index) =>  
             new Object({
                owner: el[0],
                price : el[1] == 0 ? array[index].price : el[1],
                object: el[2] == "" ? array[index].object : el[2],
                smartContractId: array[index].smartContractId,
                name : el[4] == 0 ? array[index].name : el[4]
            }))

        cb(tokenDetails);
        
    })

}