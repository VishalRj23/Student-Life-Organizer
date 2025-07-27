const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const Goal = require('../models/Goal');
const Mood = require('../models/Mood');

// GET: Total pending tasks
router.get('/tasks/count', async (req, res) => {
  try {
    const count = await Task.countDocuments({ completed: false });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ count: 0 });
  }
});

// GET: Goals summary
router.get('/goals/summary', async (req, res) => {
  try {
    const total = await Goal.countDocuments();
    const completed = await Goal.countDocuments({ completed: true });
    res.json({ total, completed });
  } catch (error) {
    res.status(500).json({ total: 0, completed: 0 });
  }
});

// GET: Mood summary
router.get('/mood/summary', async (req, res) => {
  try {
    const moods = await Mood.find().sort({ date: -1 }).limit(7);
    const moodCount = {};
    moods.forEach(m => {
      moodCount[m.mood] = (moodCount[m.mood] || 0) + 1;
    });

    const summary =
      moods.length > 0
        ? `Mostly ${Object.keys(moodCount).reduce((a, b) =>
            moodCount[a] > moodCount[b] ? a : b
          )} this week 😊`
        : 'No data';
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ summary: 'No data' });
  }
});

module.exports = router;
