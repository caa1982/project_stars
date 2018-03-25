const mongoose          = require('mongoose');
const SpaceObjectModel = require("../models/spaceObject");

exports.getObjectsForPortfolio = (req, res) => {
 
  const query = {
    smartContractId: req.body.tokens,
  }

  SpaceObjectModel.find(query).exec( function (err, result) {
    if(err) {
      console.log(err)
    }

    res.send({data: result})
  })

};

exports.getStars = (req, res) => {
    
  const query = {
    object: "star",
  }
 
  SpaceObjectModel.paginate(query, optionsPaginate(req, 9), (err, result) => {
    if(err) {
      console.log(err)
    }
      res.send({data: result})
    })
};

exports.getPlanets = (req, res) => {

  find(res, req, "planet");

};

exports.getExoPlanets = (req, res) => {

  const query = {
    object: "exoplanet",
    img: req.body.image === "image" ? {$exists: true} : {$ne: ''}
  }

  SpaceObjectModel.paginate(query, optionsPaginate(req, 15), (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getDwarfPlanets = (req, res) => {

  find(res, req, "dwarfPlanet");

};

exports.getPlanetSatelites = (req, res) => {

  find(res, req, "satellite");

};

exports.getSearch = (req, res) => {

  let query;
  const string = req.body.search;

  if(isNaN(req.body.search)){
    query = { name: string.charAt(0).toUpperCase() + string.slice(1) };
  } else {
    query = { hd: req.body.search };
  }
  
  SpaceObjectModel.findOne(query,  function (err, result) {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getEthUsd = (req, res) => {
  const CoinMarketCap = require("node-coinmarketcap");
  const coinmarketcap = new CoinMarketCap();
  
  coinmarketcap.get("Ethereum", coin => {
    res.send({data: coin.price_usd}); 
  });
};

const find = (res, req, object) => {

  const query = {
    object: object,
  }

  SpaceObjectModel.find(query).sort(options(req)).exec( function (err, result) {
    if(err) {
      console.log(err)
    }

    res.send({data: result})
  })
}

const  options = (req) => {
  let sortPrice;
  let sort;

  if(req.body.sortPrice === null){
    sort = req.body.sort === "ascending"? { name: 1} : { name: -1};
  } else{
    sortPrice = req.body.sortPrice === "priceHigh" ?  -1 :  1;
    sort = req.body.sort === "ascending"?  1 :  -1;
  }

  sort = req.body.sortPrice === null ? sort : { price: sortPrice, name: sort };

  return sort;
  
}

const  optionsPaginate = (req , limit) => {
  let sortPrice;
  let sort;

  if(req.body.sortPrice === null){
    sort = req.body.sort === "ascending"? { name: 1} : { name: -1};
  } else{
    sortPrice = req.body.sortPrice === "priceHigh" ?  -1 :  1;
    sort = req.body.sort === "ascending"?  1 :  -1;
  }

  const options = {
    page: req.body.page,
    limit: limit, 
    sort: req.body.sortPrice === null ? sort : { price: sortPrice, name: sort }
  }

  return options;
  
}