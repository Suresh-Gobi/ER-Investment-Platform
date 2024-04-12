const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../Utils/generateOTP");
const User = require("../Models/User.Model");
const Admin = require("../Models/Admin.Model");
const { sendVerificationEmail } = require("../Utils/emailOTP");

exports.signup = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    // Validate email format
    const emailRegex =
      /^(?=.*\b@gmail.com\b|(?=.*\b@outlook.com\b).*$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Only Gmail and Outlook email addresses are allowed",
      });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Validate password
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character",
      });
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
      otp,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: "OTP sent to email for verification" });
  } catch (error) {
    console.error("Error in signup:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Find the user with the provided email (case-insensitive)
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the provided OTP matches the stored OTP (case-insensitive)
    if (user.otp.toString().toLowerCase() !== otp.toString().toLowerCase()) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Update the isVerified field to true
    user.isVerified = true;

    // Save the updated user document
    await user.save();

    res
      .status(200)
      .json({ message: "OTP verified successfully", isVerified: true });
  } catch (error) {
    console.error("Error in verifying OTP:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(403).json({ message: "Email is not verified" });
    }

    // Generate JWT token with user data
    const tokenPayload = {
      id: user._id,
      displayName: user.displayName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
    };

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.adminSignup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the admin already exists
    let existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
    });

    // Save the admin to the database
    await newAdmin.save();

    res.status(201).json({ message: "Admin created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if the admin exists
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Compare the password
      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      // Generate JWT token with admin details
      const payload = {
        admin: {
          id: admin.id,
          username: admin.username,
          email: admin.email,
        },
      };
  
      jwt.sign(
        payload,
        process.env.JWT_SECRET, // Your JWT secret key
        { expiresIn: '1h' }, // Token expiration time
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
