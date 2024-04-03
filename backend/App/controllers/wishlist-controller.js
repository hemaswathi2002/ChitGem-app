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
