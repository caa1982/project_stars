const mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

const Schema   = mongoose.Schema;

const spaceObjectSchema = new Schema({  
    _id: String,
    hd: { type: Number, index: true },
    name: { type: String, index: true },
    object: String,
    info: String,
    price: Number,
    img: String
});


spaceObjectSchema.plugin(mongoosePaginate);

const SpaceObjects = mongoose.model('SpaceObject', spaceObjectSchema);

module.exports = SpaceObjects;