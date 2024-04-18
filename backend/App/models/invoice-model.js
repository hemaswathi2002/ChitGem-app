const {Schema,mongoose} = require('mongoose')

const invoiceSchema = new Schema({
 
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
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
 
    amount : Number,
    paymentMonth : String,
    date : Date
})
const Invoices=mongoose.model('Invoices',invoiceSchema)
module.exports=Invoices