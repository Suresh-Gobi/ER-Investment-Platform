const session = require("express-session");
const passport = require("passport");
require('dotenv').config();
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

const configurePassport = (app) => {
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: true, // Set to true for now
            saveUninitialized: true, // Set to true for now
            cookie: {
                maxAge: 1000 * 60 * 60 * 24,
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ['profile', 'email']
    }, (accessToken, refreshToken, profile, callback) => {
        // Handle errors if any
        try {
            // Perform any necessary checks or operations
            // before calling the callback
            // For example, you may want to check if the profile
            // is valid or if the user is already registered
            // Then, call the callback with the user profile
            callback(null, profile);
        } catch (error) {
            // If an error occurs, pass it to the callback
            callback(error);
        }
    }));

    passport.serializeUser((user, callback) => {
        callback(null, user);
    });

    passport.deserializeUser((user, callback) => {
        callback(null, user);
    });
};

module.exports = configurePassport;
