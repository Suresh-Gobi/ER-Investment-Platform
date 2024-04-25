const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/processPayment.Controller');
const payments = require('../Controllers/Payment.Controller')

router.post('/create-checkout-session', paymentController.createCheckoutSession);
router.post('/checkout', payments.payment);

module.exports = router;
