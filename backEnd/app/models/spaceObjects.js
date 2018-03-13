const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const spaceObjectSchema = new Schema({  
    _id: String,
    hd: Number,
    Name: String,
    Object: { type: String, index: true},
    Info: String,
    Price: Number,
    img: String,
    Skymap: String,
    wikipedia: String
});

spaceObjectSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Model', spaceObjectSchema, 'SpaceObjects');

module.exports = Model;