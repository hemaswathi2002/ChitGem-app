const mongoose = require('mongoose')

const {Schema,model} = mongoose

const reviewSchema = new Schema({
    // customerId :{
    //     type : Schema.Types.ObjectId,
    //     ref: 'Customer'
    // },
    // shopId : {
    //     type : Schema.Types.ObjectId,
    //     ref: 'Shop'
    // },
    ratings : Number,
    description : String

},{timestamps:true})

const Review = model('Review',reviewSchema)

module.exports = Review