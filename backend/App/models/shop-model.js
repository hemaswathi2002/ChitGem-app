const mongoose = require("mongoose")
const { Schema, model } = mongoose

const shopSchema = new Schema(
  {
    shopname: String,
    email:String,
    location: {
      lang: String,
      lat: String,
    },
    contact:Number,
    description: String,
    approvalStatus: {
      type: String,
      enum: ["pending", "rejected", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
)
const Shop = model("Shop", shopSchema)
module.exports = Shop
