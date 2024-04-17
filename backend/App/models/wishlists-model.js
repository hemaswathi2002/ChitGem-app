const mongoose = require("mongoose")
const { Schema, model } = mongoose

const wishlistSchema = new Schema({
    shopId : {
      type : Schema.Types.ObjectId,
      ref : 'Shop'
    },
    jewelId : {
        type : Schema.Types.ObjectId,
        ref : 'Jewel'
      },
    customerId : {
        type : Schema.Types.ObjectId,
        ref : 'Customer'
      },
})
const Wishlist = model("Wishlist", wishlistSchema)

module.exports = Wishlist