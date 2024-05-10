const Payment=require('../models/payment-model')
const Invoices = require('../models/invoice-model')
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
        return res.status(404).json({ error: 'Invoice not found for the user' });
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
            transactionId: session.id,
            amount: Number(body.amount),
            paymentType: "card"
        });
        await payment.save()
        res.json({id:session.id,url: session.url,payment})
    }catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
} 

paymentsCntrl.list=async(req,res)=>{
    try{
     const response=await Payment.find({userId:req.user.id}).sort({createdAt:-1})
     res.json(response)
    }catch(err){
        console.log(err)
        res.status(501).json({error:"internal server error"})
    }
}

paymentsCntrl.listAll=async(req,res)=>{
    try{
        const owner = req.user.id
     const response=await Payment.find({ownerId:owner}).sort({createdAt:-1})
     res.json(response)
    }catch(err){
        console.log(err)
        res.status(501).json({error:"internal server error"})
    }
}



// paymentsCntrl.listOneChit = async(req,res)=>{
//     try{
//         const shopId = req.params.id
//         const paymentid = req.params.paymentid
//         const payment = await Payment.findOne({_id:paymentid,shopId:shopId})
//         if(!payment){
//             return res.status(404).json({error:'Record Not Found'})
//         }
//         res.json(payment)
//     }catch(err){
//         console.log(err)
//         res.status(500).json({error:'Internal Server Error'})
//     }
// }

paymentsCntrl.successUpdate = async(req ,res)=>{
    const id = req.params.id
    console.log(id)
    try{
        const payment = await Payment.findOneAndUpdate({transactionId:id} , {$set:{paymentStatus: 'Successful'} } , {new:true})
        console.log('13423')
        payment.goldPrice = 0;
        const apiKey = process.env.GOLD_API_KEY;
        console.log(apiKey);
        const config = {
            headers: {
                'x-access-token': apiKey
            }
        };
        const goldPriceResponse = await axios.get("https://www.goldapi.io/api/XAU/INR", config)
        const { price_gram_24k } = goldPriceResponse.data
        console.log(goldPriceResponse.data)
        payment.goldPrice = price_gram_24k
        const goldHarvested = (payment.amount /price_gram_24k).toFixed(3)
        payment.goldHarvested = goldHarvested
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
module.exports=paymentsCntrl