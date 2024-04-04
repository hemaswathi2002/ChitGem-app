const Reviews = require('../models/review-model')
const Customer = require('../models/customer-model')
const {validationResult} = require('express-validator')
const _ = require('lodash')
const { customerId } = require('../validators/review-validation')

const reviewsCltr = {}
reviewsCltr.create = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const body = _.pick(req.body,['ratings','description'])
        body.customerId = req.user.id
        body.shopId = Customer.shopId
        const review = new Reviews(body)
        const response = await review.save()
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

reviewsCltr.list = async(req,res)=>{
    try{
        const review = await Reviews.find()
        res.status(200).json(review)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

reviewsCltr.getOneReview = async(req,res)=>{
    try{
        const id = req.params.id
        const review = await Reviews.findOne({_id:id})
        res.status(200).json(review)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

reviewsCltr.update = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const body = _.pick(req.body,['ratings','description'])
        body.customerId = req.user.id
        body.shopId = Customer.shopId
        const review = await Reviews.findOneAndUpdate({_id:id},body,{new:true})
        res.status(200).json(review)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

reviewsCltr.delete = async(req,res) => {
    try{
        const id = req.params.id
        const review = await Reviews.findOneAndDelete({_id:id,customerId:req.user.id})
        res.status(200).json(review)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

module.exports = reviewsCltr