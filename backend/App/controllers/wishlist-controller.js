const Wishlist=require('../models/wishlist-model')
const{validationResult}=require('express-validator')
const wishlistCltr={}
wishlistCltr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const{body}=req
        const wishlist=new Wishlist(body)
        await wishlist.save()
        res.status(201).json(wishlist)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:'Internal server error'})
    }
}

wishlistCltr.update=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const{body}=req
        const id=req.params.id
        const updatedWishlist=await Wishlist.findByOneAndUpdate({id:id},body,{new:true})
        
        if(!updatedWishlist){
            return res.status(404).json({errors:'Wishlist not found'})
        }
        res.status(200).json(updatedWishlist)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:'Internal server error'})
    }
}

wishlistCltr.getOneWishlist=async(req,res)=>{
    try{
        const {id}=req.params
        const wishlist= await Wishlist.findOne({_id:id})
        if(!wishlist){
            return res.status(404).json({errors:'Wishlist not found'})
        }
        res.status(200).json(wishlist)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:'Internal server error'})
    }
}

wishlistCltr.getAllWishlist=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find()
        res.json(wishlist)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:'Internal server error'})
    }
}

wishlistCltr.destroy=async(req,res)=>{
    try{
        const id=req.params.id
        const deleteWishlist=await Wishlist.findByIdAndDelete({id:id})
        
        if(!deleteWishlist){
            return res.status(404).json({errors:'Wishlist not found'})
        }
        res.status(200).json(deleteWishlist)
    }catch(error){
        console.log(error)
        res.status(500).json({errors:'Intrnal server error'})
    }
}
module.exports=wishlistCltr
=======
const {validationResult}=require("express-validator")
const wishlistClr={}
wishlistClr.create=async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const { customerId, shopId, productId } = req.body
        const wishlist = new Wishlist({
            customerId,
            shopId,
            jewelId,
        })
        await wishlist.save()
        res.status(201).json(wishlist)
    }
    catch(err){
        console.log(err)
        res.status(500).json({errors:"Internal server errors"})
    }
}
wishlistClr.update = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    try {
        const { customerId, shopId, jewelId } = req.body
        const id = req.params.id
        const existingWishlistItem = await Wishlist.findById(id)

        if (!existingWishlistItem) {
            return res.status(404).json({ errors: 'Wishlist item not found' })
        }
        existingWishlistItem.customerId = customerId
        existingWishlistItem.shopId = shopId
        existingWishlistItem.productId = jewelId
        await existingWishlistItem.save()

        res.status(200).json(existingWishlistItem)
    } catch (err) {
        console.error(err)
        res.status(500).json({ errors: 'Internal server error' })
    }
}
wishlistClr.destroy=async(req,res)=>{
    try{
        const id=req.params.id
        const wishlist=await Wishlist.findByOneAndDelete({_id:id})
        res.json(wishlist)
    }
    catch(err){
        console.log(err)
        res.json(500).json({errors:'Internal server error'})
    }
}
wishlistClr.getAllwishlist=async(req,res)=>{
    try{
        const wishlist=await Wishlist.find()
        res.json(wishlist)
    }catch(err){
        console.log(err)
        res.status(500).json({errors:'Internal server errors'})
    }
}

module.exports.wishlistClr

