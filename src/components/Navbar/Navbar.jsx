// components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-logo">
          🎫 Helpdesk System
        </Link>

        <div className="navbar-menu">
          <Link to="/dashboard" className="navbar-link">Dashboard</Link>
          <Link to="/tickets" className="navbar-link">My Tickets</Link>
          
          {user.role === 'user' && (
            <Link to="/tickets/create" className="navbar-link">Create Ticket</Link>
          )}
          
          {user.role === 'admin' && (
            <Link to="/admin" className="navbar-link">Admin Panel</Link>
          )}

          <div className="navbar-user">
            <span className="user-name">{user.name}</span>
            <span className={`user-badge ${user.role}`}>{user.role}</span>
            <button onClick={handleLogout} className="btn btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;