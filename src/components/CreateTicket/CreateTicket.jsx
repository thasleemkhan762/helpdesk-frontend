// components/CreateTicket.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateTicket.css';

const API_URL = 'http://localhost:5000/api';

function CreateTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'General'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/tickets`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setSuccess('Ticket created successfully! You will receive an email confirmation.');
      setTimeout(() => {
        navigate(`/tickets/${response.data.ticket._id}`);
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create ticket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-ticket-container">
      <div className="create-ticket-card">
        <h2>🎫 Create New Ticket</h2>
        <p className="subtitle">Describe your issue and we'll help you resolve it</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Brief description of your issue"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide detailed information about your issue..."
              rows="6"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Priority *</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option value="Low">🟢 Low - Can wait</option>
                <option value="Medium">🟡 Medium - Normal urgency</option>
                <option value="High">🟠 High - Important</option>
                <option value="Critical">🔴 Critical - Urgent</option>
              </select>
              <small>Select based on the urgency of your issue</small>
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="IT">💻 IT Support</option>
                <option value="HR">👥 HR Support</option>
                <option value="General">📋 General</option>
              </select>
              <small>Choose the relevant department</small>
            </div>
          </div>

          <div className="sla-info">
            <h4>📅 Expected Response Time (SLA):</h4>
            <ul>
              <li><strong>Critical:</strong> 4 hours</li>
              <li><strong>High:</strong> 8 hours</li>
              <li><strong>Medium:</strong> 24 hours</li>
              <li><strong>Low:</strong> 48 hours</li>
            </ul>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => navigate('/tickets')}
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Creating...' : 'Create Ticket'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateTicket;