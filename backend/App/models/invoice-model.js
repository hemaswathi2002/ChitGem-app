const {Schema,mongoose} = require('mongoose')

const invoiceSchema = new Schema({
 
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
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
const Invoices=mongoose.model('Invoices',invoiceSchema)
module.exports=Invoices