import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDarkMode } from '../../contexts/DarkModeContext';
import './Navbar.css';

function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard';
    }
    if (path === '/tickets') {
      return (
        location.pathname === '/tickets' ||
        (location.pathname.startsWith('/tickets/') &&
          location.pathname !== '/tickets/create')
      );
    }
    if (path === '/tickets/create') {
      return location.pathname === '/tickets/create';
    }
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return false;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        <Link to="/dashboard" className="navbar-logo">
          🎫 Helpdesk System
        </Link>

        {/* Hamburger Button for Mobile */}
        <button 
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>

        {/* Menu Items */}
        <div className={`navbar-menu ${menuOpen ? "open" : ""}`}>
          
          <Link 
            to="/dashboard" 
            className={`navbar-link ${isActive('/dashboard') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            Dashboard
          </Link>

          <Link 
            to="/tickets" 
            className={`navbar-link ${isActive('/tickets') ? 'active' : ''}`}
            onClick={() => setMenuOpen(false)}
          >
            {user.role === 'admin' ? 'All Tickets' : 'My Tickets'}
          </Link>

          {user.role === 'user' && (
            <Link 
              to="/tickets/create" 
              className={`navbar-link ${isActive('/tickets/create') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Create Ticket
            </Link>
          )}

          {user.role === 'admin' && (
            <Link 
              to="/admin" 
              className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {/* Dark Mode Toggle */}
          <button 
            onClick={toggleDarkMode} 
            className="dark-mode-toggle"
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>

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
