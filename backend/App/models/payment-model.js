const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentMethod: String,
    invoiceId: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    transactionId : String,
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'failure'],
        default: 'pending'
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;