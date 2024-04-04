const mongoose = require('mongoose')
const {Schema,model} = mongoose

const customerSchema = new Schema({
    username : String,
    contact : {
        email : String,
        mobile : Number
    },
    ownerId : {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },
    shopId: {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },

    description : String,
    goldHarversted : String
}, {timestamps : true} )

const Customer = model('Customer',customerSchema)

module.exports = Customer
