const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Adjust path if needed

// Register route
router.post('/register', async (req, res) => {
  console.log('📩 Register endpoint hit'); // ✅ log
  console.log('Request body:', req.body);  // ✅ log

  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    console.log('❌ Missing fields in request');
    return res.status(400).json({ message: 'Please provide name, email, and password' });
  }

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      console.log('⚠️ Email already registered');
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    console.log('✅ User registered successfully');
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('❌ Error registering user:', err);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  console.log('🔑 Login endpoint hit');
  const { email, password } = req.body;

  if (!email || !password) {
    console.log('❌ Missing email or password');
    return res.status(400).json({ message: 'Please provide email and password' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ Invalid email');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('✅ Login successful');

    res.json({ token, user: { id: user._id, name: user.name } });
  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
