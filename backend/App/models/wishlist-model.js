const mongoose=require('mongoose')
const{Schema,model}=mongoose

const wishlistSchema=new Schema({
    // customerId:{
    //     type:Schema.Types.ObjectId,
    //     ref:'Customer'
    // },
    shopId:{
        type:Schema.Types.ObjectId,
        ref:'Shop'
    },
    jewelId:{
        type:Schema.Types.ObjectId,
        ref:'Jewel'
    }
},{timestamps:true})
const Wishlist=model("Wishlist",wishlistSchema)

module.exports=Wishlist
