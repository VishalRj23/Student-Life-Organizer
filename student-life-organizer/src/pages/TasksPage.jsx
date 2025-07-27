import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token'); // Get user token

  // Fetch all tasks
  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error('Error fetching tasks:', err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Add new task
  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { title, completed: false },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err.response?.data || err.message);
    }
  };

  // Toggle task
  const toggleTask = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err.response?.data || err.message);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTasks();
    } catch (err) {
      console.error('Error deleting task:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🧠 Task Manager</h1>

      <div className="flex gap-2 mb-4">
        <input
          className="border border-gray-400 p-2 rounded w-full max-w-md"
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks found. Add your first one!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <li key={task._id} className="mb-2 flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task._id)}
              />
              <button
                onClick={() => deleteTask(task._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
              <span className={task.completed ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TasksPage;
