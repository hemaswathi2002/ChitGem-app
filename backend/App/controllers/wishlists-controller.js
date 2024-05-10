const Wishlist=require('../models/wishlists-model')
const { validationResult } = require("express-validator")
const Wishlistcltr = {}

Wishlistcltr.create = async function(req, res) {
  try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }
      const userId = req.user.id;
      const { jewelId, images, caption, price } = req.body;

      const existingWishlistItem = await Wishlist.findOne({ userId, jewelId });

      if (existingWishlistItem) {
          const removedItem = await Wishlist.findOneAndDelete({ userId, jewelId });
          return res.status(200).json({ message: 'Item removed from wishlist', removedItem });
      }
      const wishlist = new Wishlist({ jewelId, userId, images, caption, price });
      const savedWishlist = await wishlist.save();

      res.status(201).json(savedWishlist);
  } catch (error) {
      console.error('Error creating wishlist:', error);
      res.status(500).json({ error: 'Failed to create wishlist' });
  }
};

Wishlistcltr.list = async (req, res) => {
  try {
    const userId = req.user.id;

    const wishlist = await Wishlist.find({userId})
    res.json(wishlist)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}
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
