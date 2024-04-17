const Jewels = require('../models/jewel-model')
const Shop = require('../models/shop-model')
const {validationResult} = require('express-validator')
const _ = require('lodash')
const jewelsCltr = {}

jewelsCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try {
        console.log(req.files)
        const result =[]
        req.files.forEach(ele =>{
            result.push(ele.filename)
        })
        
      const images = req.files.map(file => file.path);
      console.log(images)
      const body = _.pick(req.body,['image','price','caption'])
      const shop = await Shop.findOne({ownerId:req.user.id})
      body.shopId = shop.id
      const jewel = new Jewels(body)
      jewel.images = result
      console.log(jewel)
      const savedJewel = await jewel.save();
  
      res.status(200).json({ message: 'Files uploaded successfully!', jewel: savedJewel });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }


jewelsCltr.get = async(req,res) =>{
    try{
        const jewel = await Jewels.find()
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

jewelsCltr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const body = _.pick(req.body,['image','price','caption'])
        const shop = await Shop.findOne({ownerId:req.user.id})
        body.shopId = shop.id
        const jewel = await Jewels.findOneAndUpdate({_id:id},body,{new:true})
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

jewelsCltr.delete = async(req,res) => {
    try{
        const id = req.params.id
        const jewel = await Jewels.findOneAndDelete({_id:id,ownerId:req.user.id})
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

module.exports = jewelsCltr



