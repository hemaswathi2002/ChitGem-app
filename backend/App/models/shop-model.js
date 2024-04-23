const mongoose = require("mongoose")
const { Schema, model } = mongoose

const shopSchema = new Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Reference to the User model
},
    shopName: String,
    address: {
        area: String,
        pincode: Number,
        city: String,
        state: String
    },
    contact: {
      mobile : Number,
      email : String
      
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