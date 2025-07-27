// routes/goals.js
const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const authMiddleware = require('../middleware/authMiddleware');

// Create Goal (for logged-in user)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newGoal = new Goal({
      title: req.body.title,
      achieved: false,
      dueDate: req.body.dueDate, // <-- Save dueDate
      userId: req.user.id
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add goal' });
  }
});

// Get All Goals (for logged-in user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goals' });
  }
});

// Toggle Completion
router.put('/:id', async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    goal.completed = !goal.completed;
    await goal.save();
    res.json(goal);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update goal' });
  }
});

// Delete Goal
router.delete('/:id', async (req, res) => {
  try {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete goal' });
  }
});

// Format Due Date
router.get('/format-due-date/:id', authMiddleware, async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    const formattedDate = goal.dueDate
      ? `(Due: ${new Date(goal.dueDate).toLocaleDateString()})`
      : '';
    res.json({ formattedDate });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch goal' });
  }
});

module.exports = router;
