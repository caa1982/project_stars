const mongoose          = require('mongoose');
const SpaceObjectModel = require("../models/spaceObject");

exports.getStars = (req, res) => {
    
  const query = {
    object: "star",
  }
 
  SpaceObjectModel.paginate(query, optionsPaginate(req), (err, result) => {
    if(err) {
      console.log(err)
    }
      res.send({data: result})
    })
};

exports.getPlanets = (req, res) => {

  const query = {
    object: "Planet",
  }

  SpaceObjectModel.find(query).sort(options(req)).exec( function (err, result) {
    if(err) {
      console.log(err)
    }
    
    res.send({data: result})
  })
};

exports.getExoPlanets = (req, res) => {

  const query = {
    object: "exoplanet",
    img: req.body.image === "image" ? {$exists: true} : {$ne: ''}
  }

  SpaceObjectModel.paginate(query, optionsPaginate(req), (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getDwarfPlanets = (req, res) => {

  const query = {
    object: "dwarf planet",
  }

  SpaceObjectModel.find(query).sort(options(req)).exec( function (err, result) {
    if(err) {
      console.log(err)
    }
    
    res.send({data: result})
  })
};

exports.getPlanetSatelites = (req, res) => {

  const query = {
    object: "Satellite",
  }

  SpaceObjectModel.find(query).sort(options(req)).exec( function (err, result) {
    if(err) {
      console.log(err)
    }
    
    res.send({data: result})
  })
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
  var CoinMarketCap = require("node-coinmarketcap");
  var coinmarketcap = new CoinMarketCap();
  
  coinmarketcap.get("Ethereum", coin => {
    res.send({data: coin.price_usd}); 
  });
};

var  options = (req) => {
  let sortPrice;
  let sort;

  if(req.body.sortPrice === null){
    sort = req.body.sort === "ascending"? { name: 1} : { name: -1};
  } else{
    sortPrice = req.body.sortPrice === "priceHigh" ?  -1 :  1;
    sort = req.body.sort === "ascending"?  1 :  -1;
  }

  sort = req.body.sortPrice === null ? sort : { price: sortPrice, name: sort };

  console.log(req.body.sortPrice)

  return sort;
  
}

var  optionsPaginate = (req) => {
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
    limit: 9, 
    sort: req.body.sortPrice === null ? sort : { price: sortPrice, name: sort }
  }

  return options;
  
}