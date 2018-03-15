const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema   = mongoose.Schema;

const spaceObjectSchema = new Schema({  
    _id: String,
    hd: Number,
    name: String,
    object: String,
    info: String,
    price: Number,
    img: String,
    skymap: String,
    wikipedia: String
});

spaceObjectSchema.index({ object: 1}, {unique: false})
spaceObjectSchema.plugin(mongoosePaginate);

const SpaceObjects = mongoose.model('SpaceObject', spaceObjectSchema);

module.exports = SpaceObjects;