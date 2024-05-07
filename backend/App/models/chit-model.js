const mongoose=require('mongoose')
const{Schema,model}=mongoose

const chitSchema=new Schema({
    name : String,
    email : String,
    shopId:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    userId : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'Customer'
    },
    ownerId : {
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    chitAmount :{
       type: Number,
       default:500
    },
    installments:{
        type:Number,
        default:12
    },

    totalAmount:Number,

    date: {
        startDate:Date,
        endDate:Date,
    },
    status: {
        type: String,
        enum: ["active", "closed"],
    }
},{ timestamps: true })

chitSchema.pre('save', function(next) {
    const startDate = this.date.startDate
    const installments = this.installments
    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + installments)
    this.date.endDate = endDate
    next()
  })
const Chit=mongoose.model('Chit',chitSchema)
module.exports=Chit