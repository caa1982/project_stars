const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const spaceObjectSchema = new Schema({  
    _id: String,
    hd: Number,
    Name: String,
    Object: String,
    Info: String,
    Price: Number,
    img: String,
    Skymap: String,
    wikipedia: String
});

const Model = mongoose.model('Model', spaceObjectSchema, 'SpaceObjects');

module.exports = Model;