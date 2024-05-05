const Wishlist=require('../models/wishlists-model')
const { validationResult } = require("express-validator")
const Wishlistcltr = {}
Wishlistcltr.create = async function(req, res) {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.id
      const { jewelId} = req.body;
      const wishlist = new Wishlist({ jewelId,userId})
      const savedWishlist = await wishlist.save()

      res.status(201).json(savedWishlist);
  } catch (error) {
      console.error('Error creating wishlist:', error);
      res.status(500).json({ error: 'Failed to create wishlist' });
  }
}

// Wishlistcltr.getOnewishlist = async (req, res) => {
//     try {
//       const { id } = req.params
//       const wishlist = await Wishlist.findOne({ _id: id })
  
//       if (!wishlist) {
//         return res.status(404).json({ message: "wishlist not found" })
//       }
//       res.json(wishlist)
//     } catch (error) {
//       console.error( error)
//       res.status(500).json({ errors: "Internal Server Error" })
//     }
//   }
  Wishlistcltr.list = async (req, res) => {
    try {
      const wishlist = await Wishlist.find({userId:req.user.id})
      res.json(wishlist)
    } catch (error) {
      console.log(error)
      res.status(500).json({ errors: "Internal Server Error" })
    }
  }
 
// Wishlistcltr.update = async (req, res) => {
//     const errors = validationResult(req)
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() })
//     }
//     try {
//       const id = req.params.id
//       const { body } = req
//       const wishlist = await Wishlist.findOneAndUpdate({ _id: id }, body, { new: true })
      
//       res.status(200).json(wishlist)
//     } catch (err) {
//       console.error(err)
//       res.status(500).json({ errors: "Internal server error" })
//     }
//   }
  Wishlistcltr.destroy = async (req, res) => {
    try {
      const id = req.params.id
      const wishlist = await Wishlist.findOneAndDelete({ _id: id})
      res.json(wishlist)
    } catch (error) {
      console.error(error)
      res.status(500).json({ errors: "Internal Server Error" })
    }
  }
  

module.exports = Wishlistcltr
