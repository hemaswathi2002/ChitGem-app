const Wishlist=require('../models/wishlist-model')
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