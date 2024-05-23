const Payment=require('../models/payment-model')
const Invoices = require('../models/invoice-model')
const Chits = require('../models/chit-model')
const PDFDocument = require('pdfkit')
const fs = require('fs')
const axios = require('axios')
const _ = require('lodash')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const paymentsCntrl={}

paymentsCntrl.pay = async(req,res)=>{
    const userId = req.user.id
    const body = _.pick(req.body,['invoiceId','amount','ownerId'])

    try{
        const invoice = await Invoices.findOne({userId})
        if (!invoice) {
        return res.status(404).json({ error: 'Invoice not found for the user' })
        }
        const customer = await stripe.customers.create({
            name: "Testing",
            address: {
                line1: 'India',
                postal_code: '560002',
                city: 'Bangalore',
                state: 'Karnataka',
                country: 'US',
            },
        })
        
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:[{
                price_data:{
                    currency:'inr',
                    product_data:{
                        name:'chit-amount'
                    },
                    unit_amount:body.amount * 100
                },
                quantity: 1
            }],
            mode:"payment",
            success_url:"http://localhost:3000/success",
            cancel_url: 'http://localhost:3000/cancel',
            customer : customer.id
        })
        body.ownerId = invoice.ownerId
        const payment = new Payment({
            ...body,
            userId,
            invoiceId: invoice._id, 
            ownerId : invoice.ownerId,
            chit : invoice.chit,
            transactionId: session.id,
            amount: Number(body.amount),
            paymentType: "card"
        });
        console.log(payment.shopName)
        await payment.save()
        res.json({id:session.id,url: session.url,payment})
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
} 

paymentsCntrl.list=async(req,res)=>{
    try{
     const response=await Payment.find({userId:req.user.id})
     res.json(response)
    }catch(err){
        console.log(err)
        res.status(501).json({error:"internal server error"})
    }
}

paymentsCntrl.generatePdf = async(req, res) => {
    const paymentId = req.params.id;

    try {
        const payment = await Payment.findById(paymentId)
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Create a new PDF document
        const doc = new PDFDocument();

        // Pipe the PDF document to a buffer
        const buffers = [];
        doc.on('data', (chunk) => {
            buffers.push(chunk);
        });

        doc.fontSize(12).text(`Date: ${payment.createdAt}`)
        doc.fontSize(12).text(`Transaction ID: ${payment.transactionId}`)
        doc.fontSize(12).text(`Shop: ${payment.shopName}`)
        doc.fontSize(12).text(`Gold Price: ${payment.goldPrice}`)
        doc.fontSize(12).text(`Gold Harvested: ${payment.goldHarvested}`)
        doc.fontSize(12).text(`Amount: ${payment.amount}`)
        doc.fontSize(12).text(`Payment Type: ${payment.paymentType}`)
        doc.fontSize(12).text(`Status: ${payment.paymentStatus}`)

        doc.end()

        doc.on('end', () => {
            const pdfData = Buffer.concat(buffers)
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', `attachment; filename="payment_${paymentId}.pdf"`)
            res.send(pdfData)
        });
    } catch (err) {
        console.error('Failed to generate PDF:', err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
};




paymentsCntrl.listAll=async(req,res)=>{
    try{
        const owner = req.user.id
     const response=await Payment.find({ownerId:owner,paymentStatus:'Successful'}).sort({createdAt:-1})
     res.json(response)
    }catch(err){
        console.log(err)
        res.status(501).json({error:"internal server error"})
    }
}



paymentsCntrl.listOneChit = async(req,res)=>{
    try{
        const chitId = req.params.chitId
        const owner = req.user.id
        const payment = await Payment.find({chit:chitId,ownerId:owner,paymentStatus:'Successful'})
        // if(!payment){
        //     return res.status(404).json({error:'Record Not Found'})
        // }
        console.log(payment)
        console.log(chitId)
        console.log(owner)
        res.json(payment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}

paymentsCntrl.successUpdate = async(req ,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const payment = await Payment.findOneAndUpdate({transactionId:id} , {$set:{paymentStatus: 'Successful'} } , {new:true})
        console.log('13423')
        payment.goldPrice = 0;
        // const apiKey = process.env.GOLD_API_KEY;
        // console.log(apiKey);
        // const config = {
        //     headers: {
        //         'x-access-token': apiKey
        //     }
        // };
        // const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
        // const { price_gram_24k } = goldPriceResponse.data
        // console.log(goldPriceResponse.data)
        // payment.goldPrice = (price_gram_24k).toFixed(0)
        // const goldHarvested = (payment.amount /price_gram_24k).toFixed(3)
        // payment.goldHarvested = goldHarvested
        await payment.save()
        console.log('Payment with gold price updated:', payment)
        res.json(payment)
    } catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
paymentsCntrl.failureUpdate=async(req,res)=>{
    const id=req.params.id
    try{
        const payment=await Payment.findOneAndUpdate({transactionId:id},{$set:{paymentStatus: "Failed"}},{new:true})
        res.status(200).json(payment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server errror"})
    }
}
paymentsCntrl.chitsNotPaid = async (req, res) => {
         const owner = req.user.id
    try {
        const chits = await Chits.find({ownerId:owner})
        const today = new Date()
        const missedPayments = []
        for(const chit of chits){
            let registrationDate = new Date(chit.createdAt)
            let currentDate = new Date(registrationDate)
            while(currentDate <= today){
                const nextMonth = currentDate.getMonth() + 1
                console.log(nextMonth)
                const nextPaymentDate = new Date(currentDate.getFullYear(), nextMonth,1)
                const payment = await Payment.findOne({
                    chit : chit._id,
                    paymentDate : {
                        $gte:currentDate,
                        $lt : nextPaymentDate
                    }
                })
                if(!payment){
                    missedPayments.push({
                        chit : chit._id,
                        name : chit.name,
                        email : chit.email,
                        amount : chit.chitAmount,
                        month_year: `${nextMonth}/${currentDate.getFullYear()}`                       
                    })
                }
                currentDate = nextPaymentDate
            }
        }
        res.json({missedPayments : missedPayments})
       
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }





module.exports=paymentsCntrl