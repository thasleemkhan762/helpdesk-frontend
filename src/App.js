// App.js - Main React Component
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { DarkModeProvider } from './contexts/DarkModeContext';
import './DarkMode.css';

// Components
import Login from './components/AuthPages/Login';
import Register from './components/AuthPages/Register';
import Dashboard from './components/Dashboard/Dashboard';
import TicketList from './components/TicketList/TicketList';
import CreateTicket from './components/CreateTicket/CreateTicket';
import TicketDetails from './components/TicketDetails/TicketDetails';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Navbar from './components/Navbar/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (userData && token) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <DarkModeProvider>
      <Router>
        <div className="App">
          {user && <Navbar user={user} onLogout={handleLogout} />}
          
          <Routes>
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            <Route 
              path="/register" 
              element={!user ? <Register onLogin={handleLogin} /> : <Navigate to="/dashboard" />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tickets" 
              element={user ? <TicketList user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tickets/create" 
              element={user ? <CreateTicket user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/tickets/:id" 
              element={user ? <TicketDetails user={user} /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/admin" 
              element={user && user.role === 'admin' ? <AdminDashboard /> : <Navigate to="/dashboard" />} 
            />
            
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;