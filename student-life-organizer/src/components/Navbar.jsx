import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Clear user from context
    localStorage.removeItem('token'); // Clear token from local storage
    navigate('/login'); // Redirect to login
  };

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    padding: '10px',
    background: '#222',
    color: '#fff',
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? '#61dafb' : '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: location.pathname === path ? '#333' : 'transparent',
    transition: 'background-color 0.3s',
  });

  const logoutButtonStyle = {
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    padding: '8px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  };

  return (
    <nav style={navStyle}>
      <Link to="/dashboard" style={linkStyle('/dashboard')}>Dashboard</Link>
      <Link to="/tasks" style={linkStyle('/tasks')}>Tasks</Link>
      <Link to="/goals" style={linkStyle('/goals')}>Goals</Link>
      <Link to="/mood" style={linkStyle('/mood')}>Mood</Link>
      <button onClick={handleLogout} style={logoutButtonStyle}>Logout</button>
    </nav>
  );
};

export default Navbar;
