const { Schema, model } = require('mongoose')

const invoiceSchema = new Schema({
    name: String,
    date : Date,
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'Shop'
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    chit: {
        type: Schema.Types.ObjectId,
        ref: 'Chit'
    },

    amount: Number,
    totalAmount: Number,
    goldPrice: {
        type: Object,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
   

    // amountPaid : Number,
    paymentMonth: String
})
const Invoice = model('Invoice', invoiceSchema)
module.exports = Invoice