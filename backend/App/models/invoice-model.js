const mongoose = require('mongoose')

const invoiceSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    chit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chit'
    },
    totalAmount: Number,
})

const Invoice = mongoose.model('Invoice', invoiceSchema)

module.exports = Invoice
