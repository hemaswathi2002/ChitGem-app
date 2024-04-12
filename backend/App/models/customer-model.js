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
        ref : 'User'
    },
    shopId: {
        type : Schema.Types.ObjectId,
        ref : 'Shop'
    },
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    description : String,
    goldHarversted : String
}, {timestamps : true} )

const Customer = model('Customer',customerSchema)

module.exports = Customer
