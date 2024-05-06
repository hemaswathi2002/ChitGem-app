const Shop = require("../models/shop-model")
const { validationResult } = require("express-validator")
const _ = require('lodash')
const nodemailer = require('nodemailer');
const shopsCltr = {}

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: process.env.ADMIN_SMTP_USERNAME,
    pass: process.env.ADMIN_SMTP_PASSWORD
  }
})

shopsCltr.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  try {
      const body = _.pick(req.body,['shopName','address','contact','description']);
      body.approvalStatus = 'pending';
      body.ownerId = req.user.id;

      const shop = new Shop(body);
      const response = await shop.save();

      await transporter.sendMail({
          from: 'your_email@example.com', 
          to: 'admin@example.com', 
          subject: 'New Shop Registration', 
          text: `A new shop with name ${body.shopName} has registered. Please review and approve it.` 
      });

      res.status(201).json(response);
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
  }
};

shopsCltr.getOneshop = async (req, res) => {
  try {
    const { ownerId } = req.params
    const shop = await Shop.find( {ownerId} )

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
    const shops = await Shop.find();
    res.json(shops);
  } catch (error) {
    console.log(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
}

shopsCltr.update = async (req, res) => {
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()})
  }
  try {
    const id = req.params.id
    const body = _.pick(req.body,['shopName','address','contact','description'])
    const shop = await Shop.findOneAndUpdate({ _id: id, ownerId : req.user.id },body,{ new: true})
    res.status(200).json(shop)
  } catch (err) {
    console.log(err)
    res.status(500).json({ errors: "Internal server error" })
  }
}

shopsCltr.updateStatus = async(req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }
  try{
    const id = req.params.id
    const body = _.pick(req.body,['approvalStatus'])
    const shop = await Shop.findOneAndUpdate({_id:id},body,{new:true})
    res.status(200).json(shop)
  }
  catch(err){
    console.log(err)
    res.status(500).json({ errors: "Internal server error" })
  }
}

shopsCltr.getAllApprovedShops = async (req, res) => {
  try {
      const shops = await Shop.find({ approvalStatus: "approved" });
      res.json(shops);
  } catch (error) {
      console.log(error);
      res.status(500).json({ errors: "Internal Server Error" });
  }
}

shopsCltr.destroy = async (req, res) => {
  try {
    const id = req.params.id
    const shop = await Shop.findOneAndDelete({ _id: id})
    res.json(shop)
  } catch (error) {
    console.error(error)
    res.status(500).json({ errors: "Internal Server Error" })
  }
}

module.exports = shopsCltr
