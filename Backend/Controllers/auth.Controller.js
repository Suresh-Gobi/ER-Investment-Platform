const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOTP } = require('../Utils/generateOTP');
const User = require('../Models/User.Model');
const { sendVerificationEmail } = require('../Utils/emailOTP');

exports.signup = async (req, res) => {
    const { email, password, role } = req.body;

    try {
        // Validate email format
        const emailRegex = /^(?=.*\b@gmail.com\b|(?=.*\b@outlook.com\b).*$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Only Gmail and Outlook email addresses are allowed' });
        }

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Validate password
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character' });
        }

        // Generate OTP
        const otp = generateOTP(6); // Implement generateOTP function

        // Send OTP to user's email
        await sendVerificationEmail(email, otp);

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with email, hashed password, role, and OTP
        const newUser = new User({
            email,
            password: hashedPassword,
            role,
            otp
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'OTP sent to email for verification' });
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
      // Find the user with the provided email
      const user = await User.findOne({ email });

      // Check if the user exists
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Check if the provided OTP matches the stored OTP
      if (user.otp !== otp) {
          return res.status(400).json({ message: 'Invalid OTP' });
      }

      // Update the isVerified field to true
      user.isVerified = true;

      // Save the updated user document
      await user.save();

      res.status(200).json({ message: 'OTP verified successfully', isVerified: true });
  } catch (error) {
      console.error('Error in verifying OTP:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the user exists in the database
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the provided password matches the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the user's email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: 'Email is not verified' });
        }

        // Generate JWT token with user data
        const tokenPayload = {
            id: user._id,
            displayName: user.displayName,
            email: user.email,
            role: user.role,
            isVerified: user.isVerified,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};