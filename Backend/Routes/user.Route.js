const express = require("express");
const userController = require('../Controllers/user.controller');
const router = express.Router();


router.post('/accountverification', userController.createAccountVerification);

module.exports = router;
