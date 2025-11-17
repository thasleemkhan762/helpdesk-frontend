// components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

const API_URL = 'https://helpdesk-backend-production.up.railway.app/api';

function Dashboard({ user }) {
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    resolved: 0
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const tickets = response.data.tickets;
      
      setStats({
        total: tickets.length,
        open: tickets.filter(t => t.status === 'Open').length,
        inProgress: tickets.filter(t => t.status === 'In Progress').length,
        resolved: tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length
      });

      setRecentTickets(tickets.slice(0, 5));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'Low': '#4caf50',
      'Medium': '#ff9800',
      'High': '#ff5722',
      'Critical': '#f44336'
    };
    return colors[priority] || '#757575';
  };

  const getStatusColor = (status) => {
    const colors = {
      'Open': '#2196f3',
      'In Progress': '#ff9800',
      'Resolved': '#4caf50',
      'Closed': '#757575'
    };
    return colors[status] || '#757575';
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, {user.name}! 👋</h1>
        <p>Here's your ticket overview</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <h3>{stats.total}</h3>
            <p>Total Tickets</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔓</div>
          <div className="stat-content">
            <h3>{stats.open}</h3>
            <p>Open Tickets</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <h3>{stats.inProgress}</h3>
            <p>In Progress</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.resolved}</h3>
            <p>Resolved</p>
          </div>
        </div>
      </div>

      <div className="recent-tickets">
        <div className="section-header">
          <h2>Recent Tickets</h2>
          <Link to="/tickets" className="btn btn-secondary">View All</Link>
        </div>

        {recentTickets.length === 0 ? (
          <div className="empty-state">
            <p>No tickets found</p>
            {user.role === 'user' && (
              <Link to="/tickets/create" className="btn btn-primary">Create Your First Ticket</Link>
            )}
          </div>
        ) : (
          <div className="tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recentTickets.map(ticket => (
                  <tr key={ticket._id}>
                    <td><strong>{ticket.ticketId}</strong></td>
                    <td>{ticket.title}</td>
                    <td>
                      <span 
                        className="badge" 
                        style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td>
                      <span 
                        className="badge" 
                        style={{ backgroundColor: getStatusColor(ticket.status) }}
                      >
                        {ticket.status}
                      </span>
                    </td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                    <td>
                      <Link to={`/tickets/${ticket._id}`} className="btn btn-sm">View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {user.role === 'user' && (
        <div className="quick-action">
          <Link to="/tickets/create" className="btn btn-primary btn-large">
            ➕ Create New Ticket
          </Link>
        </div>
      )}
    </div>
  );
}

export default Dashboard;