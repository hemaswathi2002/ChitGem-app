const {Schema,model} = require('mongoose')

const invoiceSchema = new Schema({
 
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    shopId : {
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    lineItems:[
        { 
            chit: {
                type: Schema.Types.ObjectId, 
                ref: 'Chit'
            },
            chitAmount: Number,
            totalAmount: Number,
            goldPrice: {
                type: Object, 
                required: true 
              } 
        }
    ],
 
    amountPaid : Number,
    paymentMonth : String,
    date : Date
})
const Invoices=model('Invoices',invoiceSchema)
module.exports=Invoices