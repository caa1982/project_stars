const mongoose      = require('mongoose');
const SpaceObjectsModel = require("../models/spaceObjects");

exports.getStars = (req, res) => {
    SpaceObjectsModel.find({Object: "star"}, (err, result) => {
      if(err) {
        console.log(err)
      }
      res.send({data: result})
    })
};

exports.getPlanets = (req, res) => {
  SpaceObjectsModel.find({Object: "Planet"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getExoPlanets = (req, res) => {
  SpaceObjectsModel.find({Object: "exoplanet"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getDwarfPlanets = (req, res) => {
  SpaceObjectsModel.find({Object: "dwarf planet"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};

exports.getPlanetSatelites = (req, res) => {
  SpaceObjectsModel.find({Object: "Satellite"}, (err, result) => {
    if(err) {
      console.log(err)
    }
    res.send({data: result})
  })
};