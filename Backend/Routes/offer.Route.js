const express = require('express');
const router = express.Router();
const { createOffer } = require('../Controllers/offer.Controller');

router.post('/offercreate', createOffer);

module.exports = router;