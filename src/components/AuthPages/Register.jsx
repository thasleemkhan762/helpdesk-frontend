// components/Register.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Auth.css';

const API_URL = 'https://helpdesk-backend-production.up.railway.app/api';

function Register({ onLogin }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
    department: 'General'
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
      const response = await axios.post(`${API_URL}/auth/register`, formData);
      const { token, ...userData } = response.data;
      onLogin(userData, token);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="auth-wrapper">

      <div className="auth-left">
        <h1>📝 Create Your Account</h1>
        <p>
          Join our helpdesk system to submit issues, get support faster, 
          and collaborate with agents efficiently.
        </p>
      </div>

      <div className="auth-right">
        <div className="auth-card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Register to get started</p>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <div className="registerdiv">
              <div className="form-group">
                <label>Role</label>
                <select name="role" value={formData.role} onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="agent">Agent</option>
                </select>
              </div>

              <div className="form-group">
                <label>Department</label>
                <select name="department" value={formData.department} onChange={handleChange}>
                  <option value="General">General</option>
                  <option value="IT">IT</option>
                  <option value="HR">HR</option>
                </select>
              </div>
            </div>

            <button className="btn-primary" disabled={loading}>
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>

        </div>
      </div>

  </div>
);

}

export default Register;