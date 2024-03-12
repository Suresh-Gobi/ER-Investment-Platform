const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'investor', 'activist', 'editor'],
        default: 'activist',
    },
    OTP: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
