const Customers = require('../models/customer-model')
const shop = require('../models/shop-model')
const {validationResult} = require('express-validator')

const customersCltr = {}

customersCltr.create = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const {body} = req
        const customer = new Customers(body)
        if(customer.ownerId!==shop.ownerId ){
            return res.status(403).json({errors:'You can only create customers for your own shop'})
        }
        const response = await customer.save()
        res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors: 'Internal Server Error'})
    }
}

customersCltr.list = async(req,res)=>{
    try{
        const customer = await Customers.find()
        res.status(200).json(customer)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}


customersCltr.update = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const {body} = req
        if(body.ownerId!==shop.ownerId ){
            return res.status(403).json({errors:'You can only update customers for your own shop'})
        }
        const customer = await Customers.findOneAndUpdate({_id:id},body,{new:true})
        res.status(200).json(customer)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

customersCltr.getOneCustomer = async(req,res)=>{
    try{
        const id = req.params.id
        const customer = await Customers.findOne({_id:id})
        res.status(200).json({customer})
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

customersCltr.destroy = async(req,res) => {
    try{
        const id = req.params.id
        const customer = await Customers.findOneAndDelete({_id:id})
        res.status(200).json(customer)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

module.exports = customersCltr