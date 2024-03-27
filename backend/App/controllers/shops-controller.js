const Shop = require("../models/shop-model")
const { validationResult } = require("express-validator")
const shopsCltr = {}
shopsCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { body } = req
    const existingShop = await Shop.findOne({ email: body.email },{ contact: body.contact })
    if (existingShop) {
        return res.status(400).json({ error: 'Email/phone already exists' })
    }

    const shop = new Shop(body)
    await shop.save()

    res.status(201).json(shop)
} catch (err) {
    console.error('Error registering shop:', err)
    res.status(500).json({ error: 'Internal server error' })
}
}


shopsCltrs.update = async (req, res) => {
  try {
    const id = req.params.id
    const { body } = req

    const updatedShop = await Shop.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          shopname: body.shopname,
          location: body.location,
          email: body.email,
          contact: body.contact,
          description: body.description,
          approvalStatus: body.approvalStatus,
        },
      },
      { new: true, runValidators: true }
    )

    if (!updatedShop) {
      return res.status(404).json({ message: "Shop not found" })
    }

    res.status(200).json(updatedShop)
  } catch (err) {
    console.error("Error updating shop:", err)
    res.status(500).json({ errors: "Internal server error" })
  }
}

shopsCltr.getOneshop = async (req, res) => {
  try {
    const { id } = req.params
    const shop = await Shop.findOne({ _id: id })

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" })
    }
    res.json(shop)
  } catch (error) {
    console.error("Error while getting shop record:", error)
    res.status(500).json({ error: "Error fetching shop record" })
  }
}

shopsCltr.getAllshop = async (req, res) => {
  try {
    const shop = await Shop.find()
    res.json(shop)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Error while getting all the shop records" })
  }
}

shopsCltr.destory = async (req, res) => {
  try {
    const id = req.params.id
    const deletedshop = await Shop.findOneAndDelete({ _id: id })
    if (!deletedshop) {
      return res.status(404).json({ error: "Shop not found" })
    }
    res.status(200).json({ message: "Shop deleted successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error while deleting shop" })
  }
}

module.exports = shopsCltr
