const mongoose=require('mongoose')
const{Schema,model}=mongoose

const chitSchema=new Schema({
    shopId:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    },
    amount :{
        minAmount:Number,
        maxAmount:Number,
    },
    totalAmount:Number,
    installments:{
       type:Number,
       default:12
    },
    startDate:Date,
    endDate:Date,
    status: {
        type: String,
        enum: ['active', 'closed']
    },
    benefits:String,
    termsAndConditions:String,
    goldPrice:String,
},{ timestamps: true })
const Chit=mongoose.model('Chit',chitSchema)
module.exports=Chit