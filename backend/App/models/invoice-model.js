const { Schema, model } = require('mongoose')

const invoiceSchema = new Schema({
    name: String,
    date : Date,
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    shopName : String,
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    customerId : {
        type : Schema.Types.ObjectId,
        ref: 'Customer'
    },

    chit: {
        type: Schema.Types.ObjectId,
        ref: 'Chit'
    },

    amount: Number,
    totalAmount: Number,
    amountPaid : Number,
    amountPending : Number,
    goldPrice: {
        type: Object,
    },
    goldHarvested : Number,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    paymentStatus : String,
   

    paymentMonth: String
})
const Invoice = model('Invoice', invoiceSchema)
module.exports = Invoice