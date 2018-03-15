const mongoose          = require('mongoose');
const SpaceObjectModel = require("../models/spaceObject");

exports.getStars = (req, res) => {
    
    const pageNum = req.body.page;
 
    SpaceObjectModel.paginate({object: "star"}, { page: pageNum, limit: 9 }, (err, result) => {
      
      if(err) {
        console.log(err)
      }
      console.log('result: ', result);
      res.send({data: result})
    })
};

exports.getPlanets = (req, res) => {
  SpaceObjectModel.find({object: "Planet"}, (err, result) => {
    console.log('result: ', result);
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getExoPlanets = (req, res) => {
  SpaceObjectModel.find({object: "exoplanet"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getDwarfPlanets = (req, res) => {
  SpaceObjectModel.find({object: "dwarf planet"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getPlanetSatelites = (req, res) => {
  SpaceObjectModel.find({object: "Satellite"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};