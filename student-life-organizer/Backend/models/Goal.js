const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  achieved: {
    type: Boolean,
    default: false
  },
  dueDate: {
    type: Date,           // <-- Add this field
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Goal', goalSchema);


