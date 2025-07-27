const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: String,
  progress: Number,
  total: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Goal', goalSchema);
