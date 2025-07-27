const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
  mood: String,
  date: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Mood', moodSchema);
