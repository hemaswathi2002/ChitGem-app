const Invoices= require('../models/invoice-model')
const Chit = require('../models/chit-model')
const _ = require('lodash')
const {validationResult}=require('express-validator')
const invoicesCltr={}

invoicesCltr.create=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {body}=req
        body.userId=req.user.id
        const chitUser = await Chit.findOne({userId : req.user.id})
        if (!chitUser) {
            return res.status(404).json({ errors: "Chit not found for this user" });
        }
        body.lineItems.forEach(item => {
            item.chit = chitUser._id;
            item.chitAmount = chitUser.chitAmount;
            item.totalAmount = chitUser.totalAmount;
        })
        const apiKey = process.env.GOLD_API_KEY
        console.log(apiKey)
        const config = {
        headers: {
        'x-access-token': apiKey
      }
    }
    const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
    const { price_gram_24k } = goldPriceResponse.data
    console.log(goldPriceResponse.data)
    body.lineItems.forEach(item => {
        item.goldPrice = price_gram_24k 
    })

        const invoice = new Invoices({ ...body,userId })
        const response=await invoice.save()
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal server errrors'})
    }
}
invoicesCltr.list=async(req,res)=>{
    try{
        const invoice=await Invoices.find()
        res.json(invoice)
    }catch(err){
        console.log(err)
        res.status(201).json({errors:'Internal server errors'})
    }
}

invoicesCltr.delete=async(req,res)=>{
    try{
        const id= req.params.id
        const invoice=await Invoices.findOneAndDelete({_id:id})
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
module.exports =invoicesCltr


