import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';

import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Dashboard from './pages/Dashboard';
import TasksPage from './pages/TasksPage';
import GoalsPage from './pages/GoalsPage';
import MoodLoggerPage from './pages/MoodLoggerPage';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import { AuthContext } from './context/AuthContext';

function App() {
  const { user } = useContext(AuthContext);

  return (
    <Router>
      <div className="app-container">
        <header className="header">Student Life Organizer</header>

       
        {user && <Navbar />}

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/tasks"
              element={
                <ProtectedRoute>
                  <TasksPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/goals"
              element={
                <ProtectedRoute>
                  <GoalsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/mood"
              element={
                <ProtectedRoute>
                  <MoodLoggerPage />
                </ProtectedRoute>
              }
            />
          </Routes>

          
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
