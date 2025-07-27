const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);

const goalRoutes = require('./routes/goals');
app.use('/api/goals', goalRoutes);

const moodLoggerRoute = require('./routes/moodlogger');
app.use('/api/moods', moodLoggerRoute);

const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

const dashboardRoutes = require('./routes/dashboardRoutes');
app.use('/api', dashboardRoutes); // Now /api/tasks/count etc. will work

// Test Routes
app.get('/', (req, res) => {
  res.send('🎉 Backend Server is Running');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is connected!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
