const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
    invoiceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Invoice',
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    chit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chit',
        required: true
    },
    paymentType: {
        type: String,
        enum: ['card'], 
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Payment = mongoose.model('Payment', paymentSchema)

module.exports = Payment
