const mongoose=require('mongoose')
const{Schema,model}=mongoose
const wishlistSchema = new Schema({
    customerId : {
      type : Schema.Types.ObjectId,
      ref : 'Customer'
    },
    shopId:{
        type:Schema.type.ObjectId,
        ref:'Shop'
    },
    jewelId:{
        type:Schema.type.ObjectId,
        ref:'Jewel'
    }
})
const Wishlist=mongoose.model('Wishlist',wishlistSchema)
module.exports=Wishlist