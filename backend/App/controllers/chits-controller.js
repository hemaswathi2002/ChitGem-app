const Chit = require("../models/chit-model")
const axios = require('axios')
const { validationResult } = require("express-validator")
const chitsCltr = {}
chitsCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const customerId=req.params.customerId
    const { body } = req
    const owner=req.user.id
    console.log(owner)
    const chit=await Chit.findOne({owerId:owner})
    console.log(chit)
    if(!chit){
      return res.status(404).json({errors:'Shop not found'})
    }
    console.log(chit)
  

    const apiKey = process.env.GOLD_API_KEY
    const config = {
      headers: {
        'x-access-token': apiKey
      }
    }
    const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
    const { price_gram_24k } = goldPriceResponse.data

    const chits = new Chit({
      ...body,
      ownerId: owner,
      shopId: shopId.id,
      customerId: customerId,
      goldPrice: price_gram_24k 
  });
  

    const response = await Chit.save()
    res.status(201).json(chits)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Internal server error" })
  }
}

chitsCltr.update = async (req, res) => {
  try {
    const { body } = req
    const chitId = req.params.chitId
    const updatedChit = await Chit.findByIdAndUpdate(chitId, body, {
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
