const Invoices= require('../models/invoice-model')
const axios = require('axios')
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
        body.shopId = chitUser.shopId
        body.lineItems.forEach(item => {
            item.chit = chitUser._id;
            item.chitAmount = chitUser.chitAmount;
            item.totalAmount = chitUser.totalAmount
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
invoicesCltr.list = async(req,res)=>{
    try{
        // const id = req.params.id
        const invoice = await Invoices.find()
    if(!invoice){
        return res.status(404).json({ error: 'Invoice not found' });
    }
    res.json(invoice)
    }catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
}


invoicesCltr.get = async (req, res) => {
    try {
        const apiKey = process.env.GOLD_API_KEY;
        const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
            headers: {
                'x-access-token': apiKey
            }
        });

        const  price_gram_24k  = Math.round(response.data.price_gram_24k)
        console.log(response.data.price_gram_24k)
        res.json({ goldPrice: price_gram_24k });
    } catch (error) {
        console.error('Error fetching live gold price:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

invoicesCltr.delete=async(req,res)=>{
    try{
        const id= req.params.id
        const userId = req.user.id
        const invoice=await Invoices.findOneAndDelete({_id:id, userId : userId})
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
module.exports =invoicesCltr


