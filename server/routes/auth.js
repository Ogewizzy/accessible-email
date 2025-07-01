
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json("User already exists");
    }

    // Create new user
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User saved successfully",
      user: savedUser,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route with JWT
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json("User not found");

    if (user.password !== password) {
      return res.status(400).json("Invalid password");
    }

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const verifyToken = require("../middleware/authMiddleware");

router.get("/protected", verifyToken, (req, res) => {
  res.status(200).json({
    message: "You have accessed a protected route!",
    user: req.user,
  });
});

module.exports = router;