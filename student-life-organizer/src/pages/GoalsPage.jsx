import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoalsPage = () => {
  // State variables
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [goals, setGoals] = useState([]);

  // Get token from localStorage
  const token = localStorage.getItem('token');

  // Fetch goals from backend
  const fetchGoals = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/goals', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setGoals(response.data);
    } catch (err) {
      console.error('Error fetching goals:', err);
    }
  };

  // Load goals when component mounts
  useEffect(() => {
    fetchGoals();
    // eslint-disable-next-line
  }, []);

  // Add a new goal
  const addGoal = async () => {
    if (!title.trim()) return;

    try {
      await axios.post(
        'http://localhost:5000/api/goals',
        { title, completed: false, dueDate },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle('');
      setDueDate('');
      fetchGoals();
    } catch (err) {
      console.error('Error adding goal:', err);
    }
  };

  // Toggle completion status
  const toggleGoal = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/goals/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchGoals();
    } catch (err) {
      console.error('Error toggling goal:', err);
    }
  };

  // Delete a goal
  const deleteGoal = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/goals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchGoals();
    } catch (err) {
      console.error('Error deleting goal:', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">🎯 Your Goals</h2>

      {/* Form to add new goal */}
      <div className="flex flex-wrap gap-2 mb-4 items-center">
        <input
          className="border border-gray-400 p-2 rounded"
          type="text"
          placeholder="Enter goal title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border border-gray-400 p-2 rounded"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={addGoal}
        >
          Add
        </button>
      </div>

      {/* Display list of goals */}
      <ul>
        {goals.map((goal) => (
          <li
            key={goal._id}
            className="flex items-center justify-between border-b py-2"
          >
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={goal.completed}
                onChange={() => toggleGoal(goal._id)}
              />
              <button
                onClick={() => deleteGoal(goal._id)}
                className="text-red-600 font-bold"
              >
                ❌
              </button>
              <span
                className={`${
                  goal.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {goal.title}
                <span className="text-sm text-gray-600 ml-2">
                  {goal.dueDate
                    ? `(Due: ${new Date(goal.dueDate).toLocaleDateString()})`
                    : ''}
                </span>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalsPage;
