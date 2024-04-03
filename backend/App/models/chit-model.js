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
    name:String,
    amount :{
        minAmount:Number,
        maxAmount:Number,
    },
    totalAmount:Number,
    installments:String,
    joinDate:Date,
    endDate:Date,
    status: {
        type: String,
        enum: ['active', 'closed']
    },
    benefits:String,
    termsAndConditions:String,
    goldPrice:String,
    goldHarvested:Number,
    amountSaved:Number
},{ timestamps: true })
const Chit=mongoose.model('Chit',chitSchema)
module.exports=Chit