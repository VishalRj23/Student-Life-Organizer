const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const verifyToken = require('../middleware/verifyToken');

// Get goals for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.userId });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching goals' });
  }
});

// Add goal for logged-in user
router.post('/', verifyToken, async (req, res) => {
  try {
    const newGoal = new Goal({
      title: req.body.title,
      description: req.body.description || '',
      targetDate: req.body.targetDate || null,
      achieved: false,
      userId: req.userId
    });
    await newGoal.save();
    res.json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Error creating goal' });
  }
});

module.exports = router;
