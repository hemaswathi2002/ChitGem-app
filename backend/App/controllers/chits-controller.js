const Chit = require("../models/chit-model")
const Shop = require('../models/shop-model')
const Invoice = require('../models/invoice-model')
const cron = require('node-cron')
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
    res.status(201).json(chits)
    const createdAt = new Date(chits.createdAt);
    console.log(createdAt)
    const dayOfMonth = createdAt.getDate();
    console.log(dayOfMonth)
    // cron.schedule(`*/2 * * * *`, async () => {
    //     console.log('cron schedule')
    //     try {
    //       const monthDiff = Math.ceil((new Date() - chits.createdAt) / (1000 * 60 * 60 * 24 * 30))
    //       if (monthDiff > 12) {
    //         console.log('Chit has reached 12 months. Stopping invoice generation.')
    //         return;
    //       }
    //       console.log('The cron job is functioning')
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

// // Import necessary modules and models
// const Chit = require("../models/chit-model");
// const Shop = require('../models/shop-model');
// const Invoice = require('../models/invoice-model');
// const cron = require('node-cron');
// const Customer = require('../models/customer-model');
// const { validationResult } = require("express-validator");

// // Function to generate invoice
// async function generateInvoice(chits, owner, shop, lastUser) {
//     try {
//         const monthDiff = Math.ceil((new Date() - chits.createdAt) / (1000 * 60 * 60 * 24 * 30));
//         if (monthDiff > 12) {
//             console.log('Chit has reached 12 months. Stopping invoice generation.');
//             return;
//         }
//         const year = chits.createdAt.getFullYear();
//         const month = chits.createdAt.getMonth() + 1;
//         const invoice = new Invoice({
//             name: chits.name,
//             date: chits.createdAt,
//             ownerId: owner,
//             chit: chits._id,
//             shopId: shop._id,
//             amount: chits.chitAmount,
//             totalAmount: chits.totalAmount,
//             paymentMonth: `${year}-${month}`,
//             userId: lastUser.customerId,
//         });
//         await invoice.save();
//         console.log('Invoice generated:', invoice);
//     } catch (error) {
//         console.error("Error generating invoice:", error);
//     }
// }

// const chitsCltr = {};

// chitsCltr.register = async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     try {
//         const { body } = req;
//         const owner = req.user.id;
//         const shop = await Shop.findOne({ ownerId: owner });
//         if (!shop) {
//             return res.status(404).json({ errors: 'Shop not found' });
//         }
//         const lastUser = await Customer.findOne().sort({ _id: -1 });
//         if (!lastUser) {
//             return res.status(404).json({ errors: 'No users found' });
//         }
//         const installments = 12;
//         body.totalAmount = body.chitAmount * installments;
//         const chits = new Chit({
//             ...body,
//             ownerId: owner,
//             shopId: shop._id,
//             customerId: lastUser._id,
//             userId: lastUser.customerId,
//         });
//         const response = await chits.save();
//         console.log('Chit generated:', response);
//         res.status(201).json(chits);
//     } catch (err) {
//         console.error("Error registering chit:", err);
//         res.status(500).json({ errors: "Internal server error" });
//     }
// };


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


