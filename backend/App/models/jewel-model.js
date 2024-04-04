const mongoose = require('mongoose')

const {Schema,model} = mongoose

const jewelSchema = new Schema({
    // shopId : {
    //     type : Schema.Types.ObjectId,
    //     ref : 'Shop'
    // },
    ownerId:{
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },
    images : [String],
    price : Number,
    caption : String

},{timestamps:true})

const Jewel = model('Jewel',jewelSchema)

module.exports = Jewel