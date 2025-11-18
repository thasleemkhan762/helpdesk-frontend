// components/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const API_URL = 'https://helpdesk-backend-production.up.railway.app/api';

function Login({ onLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, formData);
      const { token, ...userData } = response.data;
      onLogin(userData, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    
  <div className="auth-wrapper">
      
      {/* LEFT SIDE SECTION */}
      <div className="auth-left">
        <h1>🔧 Helpdesk Ticket System</h1>
        <p>
          A modern ticketing platform where users create support requests 
          and gets resolved efficiently.  
          <br/><br/>
          Manage issues, track progress, and improve communication.
        </p>
      </div>

      {/* RIGHT SIDE FORM */}
      <div className="auth-right">
        <div className="auth-card">

          <h2>🎫 Login</h2>
          <p className="auth-subtitle">Sign in to access your dashboard</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email}
                     onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password}
                     onChange={handleChange} required />
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
          </div>

          <div className="demo-credentials">
            <p><strong>Demo Accounts:</strong></p>
            <p>Admin: admin@company.com / admin123</p>
            <p>Agent: thasleemkhan763@gmail.com / agent123</p>
            <p>User: thasleemkhan761@gmail.com / user123</p>
          </div>

        </div>
      </div>

  </div>
);

  
}

export default Login;