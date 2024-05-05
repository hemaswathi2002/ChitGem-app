const Invoices= require('../models/invoice-model')
const axios = require('axios')
const Chit = require('../models/chit-model')
const _ = require('lodash')
const {validationResult}=require('express-validator')
const invoicesCltr={}

// invoicesCltr.create=async(req,res)=>{
//     const errors = validationResult(req)
//     if(!errors.isEmpty()){
//         return res.status(400).json({errors:errors.array()})
//     }
//     try{
//         const chit = await Chit.findOne().sort({ createdAt: -1 });
//         if (!chit) {
//             return res.status(404).json({ error: "No chits found" });
//         }
//         // if (chit.ownerId.toString() !== req.user.id) {
//         //     return res.status(403).json({ error: "Unauthorized access" });
//         // }

//         const {body}=req
//         body.ownerId = chit.shopId.ownerId
//         body.shopId = chit.shopId
//         body.name = chit.customerId.name
//     //     const apiKey = process.env.GOLD_API_KEY
//     //     console.log(apiKey)
//     //     const config = {
//     //     headers: {
//     //     'x-access-token': apiKey
//     //   }
//     // }
//     // const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
//     // const { price_gram_24k } = goldPriceResponse.data
//     // console.log(goldPriceResponse.data)
//     // body.lineItems.forEach(item => {
//     //     item.goldPrice = price_gram_24k 
//     // })
//     const startDate = new Date(chit.date.startDate);
//         const monthDifference = (new Date().getFullYear() - startDate.getFullYear()) * 12 + 
//                                  new Date().getMonth() - startDate.getMonth();


//     const invoices = [];

//     for (let i = 0; i < chit.installments; i++) {
//         const month = new Date(startDate.getFullYear(), startDate.getMonth() + monthDifference + i, 1);
//         const lineItems = [{
//             chit: chit._id,
//             amount: chit.chitAmount,
//             totalAmount: chit.totalAmount,
//             goldPrice: 600 // Or you can set it dynamically based on your requirements
//         }]
//         const invoiceData = {
//             ...body,
//             lineItems,
//             userId : chit.userId,
//             date: new Date(),
//             paymentMonth: month.toLocaleString('default', { month: 'long' })
//         };
//         invoices.push(new Invoices(invoiceData));
//         }
//             const responses = await Promise.all(invoices.map(invoice => invoice.save()))
//             res.status(201).json(responses)
//     }
//     catch(err){
//         console.log(err)
//         res.status(500).json({errors:'Internal server errrors'})
//     }
// }
invoicesCltr.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const chit = await Chit.findOne().sort({ createdAt: -1 });
        if (!chit) {
            return res.status(404).json({ error: "No chits found" });
        }

        const { body } = req;
        body.ownerId = req.user.id;
        body.shopId = chit.shopId;
        body.name = chit.customerId.name;

        const startDate = new Date(chit.date.startDate);
        const currentDate = new Date();

        // Calculate the total number of months passed since the chit start date
        const monthDifference = (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
            currentDate.getMonth() - startDate.getMonth();

        // Calculate the installment number based on registration date
        const registrationDate = new Date(body.registrationDate);
        const installmentNumber = (currentDate.getFullYear() - registrationDate.getFullYear()) * 12 +
            currentDate.getMonth() - registrationDate.getMonth();

        // Check if the user has made the initial payment
        // if (installmentNumber < 1) {
        //     return res.status(400).json({ error: "Initial payment not completed" });
        // }

        // Generate invoices for unpaid installments
        const invoices = [];
        for (let i = 1; i <= installmentNumber; i++) {
            const paymentDate = new Date(registrationDate.getFullYear(), registrationDate.getMonth() + i, registrationDate.getDate());
            const lineItems = [{
                chit: chit._id,
                amount: chit.chitAmount,
                totalAmount: chit.totalAmount,
                goldPrice: 600 // Or you can set it dynamically based on your requirements
            }];
            const invoiceData = {
                ...body,
                lineItems,
                userId: chit.userId,
                date: new Date(),
                paymentMonth: paymentDate.toLocaleString('default', { month: 'long' })
            };
            invoices.push(new Invoices(invoiceData));
        }

        // Save all invoices
        const responses = await Promise.all(invoices.map(invoice => invoice.save()));
        res.status(201).json(responses);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ errors: 'Internal server error' });
    }
};

invoicesCltr.list = async(req,res)=>{
    try{
        // const id = req.params.id
        const invoice = await Invoices.find()
    // if(!invoice){
    //     return res.status(404).json({ error: 'Invoice not found' });
    // }
    res.json(invoice)
    }catch(err){
      console.log(err)
      res.status(500).json({error:'Internal Server Error'})
    }
}

invoicesCltr.listOneCustomer = async(req,res) => {
    try{
        const invoice = await Invoices.find({userId : req.user.id})
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
    }
}


invoicesCltr.get = async (req, res) => {
    try {
        const apiKey = process.env.GOLD_API_KEY;
        const response = await axios.get("https://www.goldapi.io/api/XAU/INR", {
            headers: {
                'x-access-token': apiKey
            }
        });

        const  price_gram_24k  = Math.round(response.data.price_gram_24k)
        console.log(response.data.price_gram_24k)
        res.json({ goldPrice: price_gram_24k });
    } catch (error) {
        console.error('Error fetching live gold price:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

invoicesCltr.delete=async(req,res)=>{
    try{
        const id= req.params.id
        const userId = req.user.id
        const invoice=await Invoices.findOneAndDelete({_id:id, userId : userId})
        if (!invoice) {
            return res.status(404).json({ error: 'Invoice not found' });
        }
        res.status(200).json(invoice)
    }
    catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
module.exports =invoicesCltr


