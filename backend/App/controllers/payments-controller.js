const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { pick } = require('lodash');

const paymentsCtrlr = {};

paymentsCtrlr.pay = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = pick(req.body, 'invoiceId', 'customerName', 'TotalAmount');

    const customer = await stripe.customers.create({
        name: 'Testing',
        address: {
            line1: 'India',
            postal_code: '517501',
            city: 'Tirupati',
            state: 'AP',
            country: 'US',
        },
    });

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'inr',
                customer_data: {
                    name: body.customerName,
                },
                unit_amount: body.TotalAmount * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
        customer: customer.id,
    });
    try {
    const payment = new Payment(body);
    payment.invoiceId = body.invoiceId;
    payment.transactionId = session.id;
    payment.customerName = body.customerName;
    payment.TotalAmount = Number(body.TotalAmount);
    payment.paymentType = "card";
    await payment.save();
    res.json({ id: session.id, url: session.url });
} catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
}
};
module.exports = paymentsCtrlr;
