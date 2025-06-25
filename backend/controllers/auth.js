const User = require('../models/User'); // MySQL-based model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, msg: "Passwords do not match" });
    }

    // Check if user exists
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ success: false, msg: "Email is already registered" });
    }

    // Hash password and create user
    const hashedPass = await bcrypt.hash(password, 10);
    const userId = await User.createUser({ name, email, password: hashedPass });

    return res.status(201).json({
      success: true,
      msg: "User created successfully",
      user: { id: userId, name, email },
    });
  } catch (error) {
    console.error("Error during user signup:", error);
    return res.status(500).json({
      success: false,
      msg: "An error occurred while creating the user",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ success: false, msg: "Email and password are required" });
    }

    // Fetch user
    const user = await User.getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, msg: "Invalid credentials" });
    }

    // Clear previous token
    res.clearCookie("token", {
      httpOnly: true,
      path: '/',
      domain: process.env.FRONTEND_URL || 'localhost',
    });

    // Generate new token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set cookie with token
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    res.cookie("token", token, {
      httpOnly: true,
      path: '/',
      expires,
      domain: process.env.FRONTEND_URL || 'localhost',
    });

    return res.status(200).json({
      success: true,
      msg: "Login successful",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },token
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({
      success: false,
      msg: "An error occurred during login",
      error: error.message,
    });
  }
};
