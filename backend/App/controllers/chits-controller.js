const Chit = require("../models/chit-model")
const mongoose = require('mongoose')
const Shop = require('../models/shop-model')
const Invoice = require('../models/invoice-model')
const nodemailer = require('nodemailer');
const cron = require('node-cron')
const Customer = require('../models/customer-model')
const axios = require('axios')
const { validationResult } = require("express-validator")


const chitsCltr = {}

const sendRemainerMail = (userMail) => {
  const transport = nodemailer.createTransport({
      // host: 'smtp.gmail.com',
      host : 'smtp.mailtrap.io',
      port : 2525,
      // port: 465,
      secure: false,
      auth: {
          user: process.env.SMTP_USERNAME,
          pass: process.env.SMTP_PASSWORD
      }
  })
  
  const html = 'Hi, This is a reminder for your chit payment today.'

  async function sendMail() {
    const info = await transport.sendMail({
        from: 'sender@example.com', 
        to: userMail, 
        subject: 'Chit Payment Remainder', 
        html: html,
    })
}
sendMail().catch(console.error)
}



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
        const installments = 12
        body.totalAmount = body.chitAmount * installments
    const newChits = new Chit({
      ...body,
      ownerId: owner,
      shopId: shop._id,
      customerId: lastUser._id,
      userId : lastUser.customerId,
  });
  const chits = await newChits.save()
    console.log('chit generated',chits)
    const chitname = chits.email
    res.status(201).json(chits)
    const createdAt = new Date(chits.createdAt);
    console.log(createdAt)
    const dayOfMonth = createdAt.getDate();
    console.log(dayOfMonth)
    cron.schedule('* * * * *', async () => {     
      console.log('Sending chit reminder email...')
      if(chitname){
        await sendRemainerMail(chitname)
      }else {
        console.log('Email not found')
      }
  })
          const year = createdAt.getFullYear();
        const month = createdAt.getMonth() + 1;
        const invoice = new Invoice({
          name: chits.name,
          date: chits.createdAt,
          ownerId: chits.ownerId,
          chit : chits._id,
          shopId: chits.shopId,
          customerId : chits.customerId,
          amount : chits.chitAmount,
          totalAmount : chits.totalAmount,
          goldHarvested : 0,
          amountPaid : 0,
          amountPending : chits.totalAmount,
          paymentMonth: `${year}-${month}`,
          userId: chits.userId,
        })
        await invoice.save()
        // res.status(200).json(invoice)
        console.log('Invoice generated', invoice)
    //   } catch (error) {
    //     console.error("Error generating invoice:", error);
    //   }
    // });
    
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
    const id = req.params.id
    const chit = await Chit.findById(id).populate('cusomerId')

    if (!chit) {
      return res.status(404).json({ message: "Chit not found" });
    }

    if (!chit.ownerId == req.user.id) {
      return res.status(403).json({ message: "Access denied." });
    }

    res.json(chit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errors: "Internal Server Error" });
  }
}

chitsCltr.getUsersChit = async(req,res) => {
  try{
    const userId = req.user.id
    const chit = await Chit.find({userId})
    res.status(200).json(chit)
  }
  catch(err){
    console.log(err)
  }
}

// chitsCltr.getAllchit = async (req, res) => {
//   try {
//     const chit = await Chit.find()
//     res.json(chit)
//   } catch (error) {
//     console.log(error)
//     res.status(500).json({ errors: "Internal Server Error" })
//   }
// }

chitsCltr.getCustomersChit = async(req,res) =>{
  try{
    const { id: customerId } = req.params
        const ownerId = req.user.id
    console.log(customerId)
    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res.status(400).json({ error: 'Invalid customerId' });
    }
   
    const chit = await Chit.find({customerId,ownerId})
    console.log('customerId:', customerId);
    console.log('ownerId:', ownerId);

    res.json(chit)
  }
  catch(err){
    console.log(err)
    res.status(500).json({errors:'Internal Server Error'})
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


