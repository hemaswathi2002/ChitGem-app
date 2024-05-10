const Jewels = require('../models/jewel-model')
const Shop = require('../models/shop-model')
const {validationResult} = require('express-validator')
const _ = require('lodash')
const jewelsCltr = {}

jewelsCltr.create = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    try {
        const { body, file } = req
        const owner = req.user.id
        const shop = await Shop.find({ownerId:owner})        
        if (!shop) {
            return res.status(404).json({ error: 'Shop owner not found' })
        }

        const jewel = new Jewels({
            ...body,
            ownerId: owner,
            shopId : shop._id,
            images: file.path 
        })

        await jewel.save()

        res.status(201).json(jewel)
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
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

// jewelsCltr.getAll = async(req,res) =>{
//     try{
//         const jewel = await Jewels.find()
//         res.json(jewel)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({error:'Internal Server Error'})
//     }
// }

jewelsCltr.update = async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(404).json({errors:errors.array()})
    }
    try{
        const id = req.params.id
        const body = _.pick(req.body,['images','price','caption'])
        // const shop = await Shop.findOne({ownerId:req.user.id})
        const jewel = await Jewels.findOneAndUpdate({_id:id},{ownerId:req.user.id},body,{new:true})
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
        const jewel = await Jewels.findOneAndDelete({_id:id},{ownerId:req.user.id})
        res.json(jewel)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal Server Error'})
    }
}

module.exports = jewelsCltr



