const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const verifyToken = require('../middleware/verifyToken');

// Get tasks for logged-in user
router.get('/', verifyToken, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Add task for logged-in user
router.post('/', verifyToken, async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      description: req.body.description || '',
      dueDate: req.body.dueDate || null,
      completed: false,
      userId: req.userId
    });
    await newTask.save();
    res.json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

module.exports = router;
