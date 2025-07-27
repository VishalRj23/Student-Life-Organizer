const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// ✅ POST: Add new task (only for logged-in user)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, completed } = req.body;
    const userId = req.user.id;

    const newTask = new Task({ title, completed, userId });
    await newTask.save();

    res.status(201).json(newTask);
  } catch (error) {
    console.error('❌ Error in POST /api/tasks:', error);
    res.status(500).json({ error: 'Failed to save task' });
  }
});

// ✅ GET: Fetch tasks only for logged-in user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error('❌ Error in GET /api/tasks:', error);
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

// ✅ PUT: Toggle task completion (only user's own tasks)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) return res.status(404).json({ error: 'Task not found' });

    task.completed = !task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    console.error('❌ Error in PUT /api/tasks/:id:', error);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// ✅ DELETE: Remove task by ID (only user's own tasks)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deletedTask) return res.status(404).json({ error: 'Task not found' });

    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    console.error('❌ Error in DELETE /api/tasks/:id:', error);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;
