const Customers = require('../models/customer-model')
const Shop = require('../models/shop-model')
const User = require('../models/user-model')
const _ = require('lodash')
const {validationResult} = require('express-validator')

const customersCltr = {}

customersCltr.register = async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const body = _.pick(req.body,['name','contact','description','goldHarvested'])
        const owner = req.user.id
        console.log(owner)
        const shop = await Shop.findOne({ownerId : owner})
        console.log(shop)
        if (!shop) {
            return res.status(404).json({ errors: 'Shop not found' });
        }   
        console.log(shop) 
        const customer = new Customers({ ...body, ownerId: owner , shopId:shop.id});
        const response = await customer.save()
        const lastUser = await User.findOne().sort({ _id: -1 }).limit(1);
        if (!lastUser) {
            return res.status(404).json({ errors: 'No users found' });
        }
        const responseData = await Customers.findByIdAndUpdate(response._id, { customerId : lastUser._id });
        res.status(201).json(responseData)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors: 'Internal Server Error'})
    }
}

customersCltr.list = async(req,res)=>{
    try{
        const {ownerId} = req.params
        const customer = await Customers.find({ownerId})
        if (!customer) { 
            return res.status(404).json({ errors: 'Customer not found' });
        }
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
        const body = _.pick(req.body,['name','contact','description','goldHarvested'])
        const owner = req.user.id
        console.log(owner)
        const shop = await Shop.findOne({ownerId : owner})
        body.shopId = shop.id
        if (!shop) {
            return res.status(404).json({ errors: 'Shop not found' });
        }
        const customer = await Customers.findOneAndUpdate({_id:id,ownerId:req.user.id,shopId: shop.id},body,{new:true})
        if (!customer) {
            return res.status(404).json({ errors: 'Customer not found' });
          }
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