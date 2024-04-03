const Shop = require("../models/shop-model")
const { validationResult } = require("express-validator")
const _ = require('lodash')
const shopsCltr = {}
shopsCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
    try {
    const body = _.pick(req.body,['ownerId','shopName','address','location','contact','description'])
    body.approvalStatus = 'pending'
    body.ownerId = req.user.id
    const shop = new Shop(body)
    const response = await shop.save()
    res.status(201).json(response)
    shop.status = 'pending'
    shop.ownerId = req.user.id
    await shop.save()
    res.status(201).json(shop)
} catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Internal server error' })
}
}

shopsCltr.update = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const id = req.params.id
    const { body } = req
    const shop = await Shop.findOneAndUpdate({ _id: id , ownerId : req.user.id },body,{ new: true})
    res.status(200).json(shop)
  } catch (err) {
    console.log(err)
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
    console.error( error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

shopsCltr.getAllshop = async (req, res) => {
  try {
    const shop = await Shop.find()
    res.json(shop)
  } catch (error) {
    console.log(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

shopsCltr.destroy = async (req, res) => {
  try {
    const id = req.params.id
    const shop = await Shop.findOneAndDelete({ _id: id })
    res.json(shop)
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

module.exports = shopsCltr
