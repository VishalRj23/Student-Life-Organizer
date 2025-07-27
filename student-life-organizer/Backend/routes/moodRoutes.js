const express = require('express');
const router = express.Router();
const Mood = require('../models/Mood');
const verifyToken = require('../middleware/verifyToken');

router.get('/', verifyToken, async (req, res) => {
  const moods = await Mood.find({ userId: req.userId });
  res.json(moods);
});

router.post('/', verifyToken, async (req, res) => {
  const newMood = new Mood({
    mood: req.body.mood,
    date: new Date(),
    userId: req.userId
  });
  await newMood.save();
  res.json(newMood);
});

module.exports = router;
