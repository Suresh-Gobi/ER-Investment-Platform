const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../Models/Transcation.Model');

async function createCheckoutSession(req, res) {
    const { amount, currency, successUrl, cancelUrl } = req.body;

    // Create a new Payment instance
    const payment = new Payment(amount, currency, successUrl, cancelUrl);

    // Validate the payment data using the model's method
    if (!payment.validate()) {
        return res.status(400).json({ error: 'Invalid payment data' });
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{
                price_data: {
                    currency,
                    product_data: {
                        name: 'Your Product Name',
                    },
                    unit_amount: amount,
                },
                quantity: 1,
            }],
            mode: 'payment',
            success_url: successUrl,
            cancel_url: cancelUrl,
        });
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        res.status(500).json({ error: 'Failed to create checkout session' });
    }
}

module.exports = {
    createCheckoutSession,
};
