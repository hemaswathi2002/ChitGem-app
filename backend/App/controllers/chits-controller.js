const Chit = require("../models/chit-model")
const Shop = require('../models/shop-model')
const Customer = require('../models/customer-model')
const axios = require('axios')
const { validationResult } = require("express-validator")
const chitsCltr = {}
chitsCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { body } = req
    const owner=req.user.id
    const shop = await Shop.findOne({ownerId : owner})
    if(!shop){
      return res.status(404).json({errors:'Shop not found'})
    }
    const lastUser = await Customer.findOne().sort({ _id: -1 }).limit(1);
        if (!lastUser) {
            return res.status(404).json({ errors: 'No users found' });
        }

    const apiKey = process.env.GOLD_API_KEY
    console.log(apiKey)
    const config = {
      headers: {
        'x-access-token': apiKey
      }
    }
    const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
    const { price_gram_24k } = goldPriceResponse.data
    console.log(goldPriceResponse.data)

    const chits = new Chit({
      ...body,
      ownerId: owner,
      shopId: shop._id,
      customerId: lastUser._id,
      goldPrice: price_gram_24k 
  });
  

    const response = await chits.save()
    console.log(response)
    res.status(201).json(chits)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Internal server error" })
  }
}
chitsCltr.update = async (req, res) => {
  try {
    const { body } = req
    const id = req.params.id
    const updatedChit = await Chit.findByIdAndUpdate(id, body, {
      new: true,
    })

    if (!updatedChit) {
      return res.status(404).json({ errors: "Chit not found" })
    }
    res.status(200).json(updatedChit)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Internal server error" })
  }
}
chitsCltr.getOnechit = async (req, res) => {
  try {
    const { id } = req.params
    const chit = await Chit.findOne({ _id: id })

    if (!chit) {
      return res.status(404).json({ message: "Chit not found" })
    }
    res.json(chit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

chitsCltr.getAllchit = async (req, res) => {
  try {
    const chit = await Chit.find()
    res.json(chit)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}
chitsCltr.destroy = async (req, res) => {
  try {
    const id = req.params.id
    const chit = await Chit.findOneAndDelete({ _id: id })
    res.json(chit)
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}
module.exports = chitsCltr
