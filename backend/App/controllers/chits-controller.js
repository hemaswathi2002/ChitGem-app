const Chit = require("../models/chit-model")
const { validationResult } = require("express-validator")
const chitsCltr = {}
chitsCltr.register = async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const { body } = req
    const chit = new Chit(body)
    chit.customerId = req.user.id
    const response = await chit.save()
    res.status(201).json(chit)
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
