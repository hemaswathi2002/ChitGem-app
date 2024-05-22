const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentType: String,
    invoiceId: {
        type: Schema.Types.ObjectId,
        ref: 'Invoice'
    },
    userId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerId : {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chit: {
        type: Schema.Types.ObjectId,
        ref: 'Chit'
    },
    shopName : String,
    transactionId : String,
    amount: {
        type: Number,
        required: true
    },
    goldPrice : {
        type : Number,
        default : 0
    },
    goldHarvested :{
        type : Number,
        default : 0
    },
    paymentStatus:{
        type:String,
        default:"pending"
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;