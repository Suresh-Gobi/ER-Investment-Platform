const express = require("express");
const passport = require("passport");
const axios = require("axios");
const authController = require("../Controllers/auth.Controller");
const User = require("../Models/User.Model");
const router = express.Router();
const generateToken = require("../Utils/generateToken");

router.get("/google/callback", passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: `${process.env.CLIENT_URL}/login/failed`,
}));

router.get("/google", async (req, res) => {
    try {
        const response = await axios.get("https://accounts.google.com/o/oauth2/v2/auth", {
            params: req.query
        });

        console.log(response);
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get("/login/success", async (req, res) => {
    if (req.user) {
        try {
            const userExists = await User.findOne({ email: req.user._json.email });

            if (userExists) {
                generateToken(res, userExists.id);
            } else {
                const newUser = new User({
                    name: req.user._json.name,
                    email: req.user._json.email,
                    password: Date.now(),
                });
                generateToken(res, newUser.id);
                await newUser.save();
            }

            res.status(200).json({
                user: { ...req.user, isAdmin: userExists.isAdmin },
                message: "success logged",
                _id: userExists._id,
            });
        } catch (error) {
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.status(403).json({ message: "Not Authorized" });
    }
});

router.get("/login/failed", (req, res) => {
    res.status(401).json({ message: "failure" });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect(process.env.CLIENT_URL);
});

// Traditional Signup
router.post("/user/signup", authController.signup);
router.post("/user/verify-otp", authController.verifyOTP);

router.post("/user/login", authController.login);

module.exports = router;
