const mongoose = require("mongoose")
const { Schema, model } = mongoose

const wishlistSchema = new Schema({
    // shopId : {
    //   type : Schema.Types.ObjectId,
    //   ref : 'Shop'
    // },
    jewelId : {
        type : Schema.Types.ObjectId,
        ref : 'Jewel'
      },
    userId : {
        type : Schema.Types.ObjectId,
        ref : 'User'
      },
    images : String,
    price : Number,
    caption : String

})
const Wishlist = model("Wishlist", wishlistSchema)

module.exports = Wishlist       

