const express = require("express");
const router = express.Router();
const authController = require("../Controllers/auth.Controller");

router.get("/google", authController.googleAuth);
router.get("/google/callback", authController.googleAuthCallback);
router.get("/logout", authController.logout);

module.exports = router;
