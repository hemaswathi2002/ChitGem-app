const Payment=require('../models/payment-model')
const Invoices = require('../models/invoice-model')
const stripe=require('stripe')(process.env.STRIPE_SECRET_KEY)
const paymentsCntrl={}

paymentsCntrl.pay = async(req,res)=>{
    // const body = pick(req.body,['bookingId','amount'])
    const {body} = req
    const userId = req.user.id

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
        
        //create a session object
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



paymentsCntrl.successUpdate = async(req ,res)=>{
    const id = req.params.id
    try{
        const payment = await Payment.findOneAndUpdate({transactionId:id} , {$set:{status: 'success'} } , {new:true})
        res.json(payment)
    } catch(err){
        console.log(err)
        res.status(500).json({error:'Internal Server Error'})
    }
}
paymentsCntrl.failerUpdate=async(req,res)=>{
    const id=req.params.id
    try{
        const payment=await Payment.findOneAndUpdate({transactionId:id},{$set:{status: "failure"}},{new:true})
        res.status(200).json(payment)
    }catch(err){
        console.log(err)
        res.status(500).json({error:"internal server errror"})
    }
}
module.exports=paymentsCntrl