const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const authMiddleware = require('../middleware/authMiddleware');
const mongoose = require('mongoose');

// Create mood entry (for logged-in user)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newMood = new Mood({
      ...req.body,
      userId: req.user.id
    });
    await newMood.save();
    res.status(201).json(newMood);
  } catch (err) {
    res.status(500).json({ error: 'Failed to log mood' });
  }
});

// Get all mood entries (for logged-in user)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(moods);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch moods' });
  }
});

// Optional: Delete a mood
router.delete('/:id', async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete mood' });
  }
});

// Remove all moods for the logged-in user
router.delete('/all', authMiddleware, async (req, res) => {
  try {
    await Mood.deleteMany({ userId: req.user.id });
    res.json({ message: 'All moods deleted' });
  } catch (err) {
    console.error('❌ Error deleting moods:', err);
    res.status(500).json({ error: 'Failed to delete moods' });
  }
});

module.exports = router;
