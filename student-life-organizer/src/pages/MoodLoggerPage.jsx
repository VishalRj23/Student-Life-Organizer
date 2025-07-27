import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MoodLogger = () => {
  const [mood, setMood] = useState('');
  const [note, setNote] = useState('');
  const [moods, setMoods] = useState([]);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch moods from backend
  useEffect(() => {
    fetchMoods();
    // eslint-disable-next-line
  }, []);

  const fetchMoods = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/moods', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMoods(res.data);
    } catch (err) {
      console.error('Failed to fetch moods:', err);
    }
  };

  // Submit new mood
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!mood) return alert('Please select a mood.');

    try {
      await axios.post(
        'http://localhost:5000/api/moods',
        { mood, note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMood('');
      setNote('');
      fetchMoods(); // Refresh the list
    } catch (err) {
      console.error('Failed to submit mood:', err);
    }
  };

  // Remove all mood history
  const handleRemoveHistory = async () => {
    if (!window.confirm('Are you sure you want to delete all mood history?')) return;
    try {
      await axios.delete('http://localhost:5000/api/moods/all', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMoods([]);
    } catch (err) {
      console.error('Failed to delete mood history:', err);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Mood Logger 😊</h2>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <select value={mood} onChange={(e) => setMood(e.target.value)} style={styles.select}>
          <option value="">Select mood</option>
          <option value="happy">😊 Happy</option>
          <option value="sad">😢 Sad</option>
          <option value="angry">😠 Angry</option>
          <option value="excited">🤩 Excited</option>
          <option value="tired">😴 Tired</option>
        </select>

        <input
          type="text"
          placeholder="Optional note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          style={styles.input}
        />

        <button type="submit" style={styles.button}>Log Mood</button>
      </form>

      <h3 style={styles.subheading}>Mood History</h3>
      <button onClick={handleRemoveHistory} style={{...styles.button, backgroundColor: '#d32f2f', marginBottom: 10}}>Remove History</button>
      <ul style={styles.list}>
        {moods.map((entry) => (
          <li key={entry._id} style={styles.item}>
            <strong>{entry.mood}</strong> - {entry.note || 'No note'} <br />
            <small>{new Date(entry.date).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Basic styles
const styles = {
  container: { padding: '20px', maxWidth: '500px', margin: 'auto' },
  heading: { fontSize: '24px', marginBottom: '15px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  select: { padding: '8px' },
  input: { padding: '8px' },
  button: { padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none' },
  subheading: { marginTop: '30px', fontSize: '20px' },
  list: { listStyle: 'none', padding: 0 },
  item: { padding: '10px 0', borderBottom: '1px solid #ccc' },
};

export default MoodLogger;
