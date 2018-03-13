const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
var mongoosePaginate = require('mongoose-paginate');

const spaceObjectSchema = new Schema({  
    _id: String,
    hd: Number,
    Name: String,
    Object: { type: String, index: true },
    Price: Number,
    img: String,
    Skymap: String,
    wikipedia: String
});

spaceObjectSchema.index({ Object: 1, type: -1 })
spaceObjectSchema.plugin(mongoosePaginate);

const Model = mongoose.model('Model', spaceObjectSchema, 'SpaceObjects');

module.exports = Model;