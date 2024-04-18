
// const Invoice = require('../models/invoice-model')
const Invoices= require('../models/invoice-model')
const {validationResult}=require('express-validator')
const invoicesCltr={}

invoicesCltr.create=async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const {body}=req
        body.customerId=req.user.id
        body.chit=Customer.chitId
        const invoice=new Invoices(body)
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
invoicesCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const id =req.params.id
        const {body}=req
        body.customerId=req.user.id
        body.chitId=Customer.chitId
        const invoice=await Invoices.findOneAndUpdate({_id:id},body,{new:true})
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Errors'})
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


