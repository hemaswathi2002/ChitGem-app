const {Schema,model} = require('mongoose')

const invoiceSchema = new Schema({
 
    shopId : {
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    ownerId :  {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    lineItems:[
        { 
            chit: {
                type: Schema.Types.ObjectId, 
                ref: 'Chit'
            },
            amount: Number,
            totalAmount: Number,
            goldPrice: {
                type: Object, 
                required: true 
              } 
        }
    ],
 
    // amountPaid : Number,
    paymentMonth : String,
    date : Date
})
const Invoices=model('Invoices',invoiceSchema)
module.exports=Invoices