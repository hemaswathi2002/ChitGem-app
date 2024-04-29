const mongoose = require("mongoose")
const { Schema, model } = mongoose

const shopSchema = new Schema({
    ownerId : {
      type : Schema.Types.ObjectId,
      ref : 'User'
    },
    contact: {
      mobile : Number,
      email : String
      
    },
    shopName: String,
    address: {
        area: String,
        city: String,
        state: String,
        pincode: Number,
    },
    
    description: String,
    approvalStatus: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },{ timestamps: true })

const Shop = model("Shop", shopSchema)

module.exports = Shop