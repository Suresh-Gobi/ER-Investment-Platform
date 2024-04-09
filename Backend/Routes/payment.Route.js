const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/processPayment.Controller');

router.post('/create-checkout-session', paymentController.createCheckoutSession);

module.exports = router;
