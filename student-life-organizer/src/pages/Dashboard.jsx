// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { ListTodo, CheckCircle, Smile } from 'lucide-react';

function Dashboard() {
  const [taskCount, setTaskCount] = useState(0);
  const [goalSummary, setGoalSummary] = useState({ completed: 0, total: 0 });
  const [moodSummary, setMoodSummary] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(formattedDate);

    // Fetch pending task count
    fetch('http://localhost:5000/api/tasks/count')
      .then(res => res.json())
      .then(data => setTaskCount(data.count || 0))
      .catch(() => setTaskCount(0));

    // Fetch goal summary
    fetch('http://localhost:5000/api/goals/summary')
      .then(res => res.json())
      .then(data => setGoalSummary(data))
      .catch(() => setGoalSummary({ completed: 0, total: 0 }));

    // Fetch mood summary
    fetch('http://localhost:5000/api/mood/summary')
      .then(res => res.json())
      .then(data => setMoodSummary(data.summary || 'No data'))
      .catch(() => setMoodSummary('No data'));
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      <h2 style={{ marginBottom: '5px' }}>👋 Welcome back, Vishal!</h2>
      <p style={{ color: '#555', marginBottom: '25px' }}>{currentDate}</p>

      <div style={containerStyle}>
        {/* Task Card */}
        <div style={cardStyle}>
          <ListTodo size={32} color="#4e73df" />
          <h3 style={titleStyle}>Pending Tasks</h3>
          <p style={valueStyle}>{taskCount}</p>
        </div>

        {/* Goal Card */}
        <div style={cardStyle}>
          <CheckCircle size={32} color="#1cc88a" />
          <h3 style={titleStyle}>Goals Progress</h3>
          <p style={valueStyle}>
            {goalSummary.completed} of {goalSummary.total}
          </p>
        </div>

        {/* Mood Card */}
        <div style={cardStyle}>
          <Smile size={32} color="#f6c23e" />
          <h3 style={titleStyle}>Mood Summary</h3>
          <p style={valueStyle}>{moodSummary}</p>
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
};

const cardStyle = {
  flex: '1',
  minWidth: '250px',
  background: '#ffffff',
  padding: '20px',
  borderRadius: '16px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  textAlign: 'center',
  transition: 'transform 0.2s ease',
  cursor: 'pointer',
};

const titleStyle = {
  fontSize: '18px',
  margin: '10px 0 5px',
};

const valueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#333',
};

export default Dashboard;
