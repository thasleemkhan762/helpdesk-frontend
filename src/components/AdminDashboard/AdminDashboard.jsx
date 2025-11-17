// components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

const API_URL = 'https://helpdesk-backend-production.up.railway.app/api';

function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/analytics/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAnalytics(response.data.analytics);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  if (!analytics) {
    return <div className="error-message">Failed to load analytics</div>;
  }

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

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>📊 Admin Analytics Dashboard</h1>
        <p>Comprehensive overview of helpdesk performance</p>
      </div>

      {/* Key Metrics */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-icon">🎫</div>
          <div className="kpi-content">
            <h2>{analytics.totalTickets}</h2>
            <p>Total Tickets</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">✅</div>
          <div className="kpi-content">
            <h2>{analytics.resolvedTickets}</h2>
            <p>Resolved Tickets</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">📈</div>
          <div className="kpi-content">
            <h2>{analytics.resolutionRate}%</h2>
            <p>Resolution Rate</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">⏱️</div>
          <div className="kpi-content">
            <h2>{analytics.avgResolutionTime}h</h2>
            <p>Avg Resolution Time</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">🎯</div>
          <div className="kpi-content">
            <h2>{analytics.slaComplianceRate}%</h2>
            <p>SLA Compliance</p>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-icon">⚠️</div>
          <div className="kpi-content">
            <h2>{analytics.overdueTickets}</h2>
            <p>Overdue Tickets</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        {/* Tickets by Status */}
        <div className="chart-card">
          <h3>Tickets by Status</h3>
          <div className="chart-content">
            {Object.entries(analytics.ticketsByStatus).map(([status, count]) => (
              <div key={status} className="chart-bar">
                <div className="chart-label">
                  <span style={{ color: getStatusColor(status) }}>●</span>
                  {status}
                </div>
                <div className="chart-value">
                  <div 
                    className="chart-fill" 
                    style={{ 
                      width: `${(count / analytics.totalTickets) * 100}%`,
                      backgroundColor: getStatusColor(status)
                    }}
                  >
                    <span className="count">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets by Priority */}
        <div className="chart-card">
          <h3>Tickets by Priority</h3>
          <div className="chart-content">
            {Object.entries(analytics.ticketsByPriority).map(([priority, count]) => (
              <div key={priority} className="chart-bar">
                <div className="chart-label">
                  <span style={{ color: getPriorityColor(priority) }}>●</span>
                  {priority}
                </div>
                <div className="chart-value">
                  <div 
                    className="chart-fill" 
                    style={{ 
                      width: `${(count / analytics.totalTickets) * 100}%`,
                      backgroundColor: getPriorityColor(priority)
                    }}
                  >
                    <span className="count">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tickets by Category */}
        <div className="chart-card">
          <h3>Tickets by Category</h3>
          <div className="chart-content">
            {Object.entries(analytics.ticketsByCategory).map(([category, count]) => (
              <div key={category} className="chart-bar">
                <div className="chart-label">
                  <span>📂</span>
                  {category}
                </div>
                <div className="chart-value">
                  <div 
                    className="chart-fill" 
                    style={{ 
                      width: `${(count / analytics.totalTickets) * 100}%`,
                      backgroundColor: '#2196f3'
                    }}
                  >
                    <span className="count">{count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Performance */}
      <div className="agent-performance">
        <h3>👥 Agent Performance</h3>
        {analytics.agentPerformance.length > 0 ? (
          <div className="performance-table">
            <table>
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Email</th>
                  <th>Tickets Resolved</th>
                  <th>Avg Resolution Time</th>
                </tr>
              </thead>
              <tbody>
                {analytics.agentPerformance.map((agent) => (
                  <tr key={agent._id}>
                    <td><strong>{agent.agentName}</strong></td>
                    <td>{agent.agentEmail}</td>
                    <td>
                      <span className="badge" style={{ backgroundColor: '#4caf50' }}>
                        {agent.ticketsResolved}
                      </span>
                    </td>
                    <td>{agent.avgResolutionTime} hours</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No agent performance data available</p>
        )}
      </div>

      {/* Recent Tickets */}
      <div className="recent-tickets-admin">
        <h3>🕒 Recent Tickets</h3>
        {analytics.recentTickets.length > 0 ? (
          <div className="tickets-table">
            <table>
              <thead>
                <tr>
                  <th>Ticket ID</th>
                  <th>Title</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Created By</th>
                  <th>Assigned To</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {analytics.recentTickets.map((ticket) => (
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
                    <td>{ticket.createdBy.name}</td>
                    <td>{ticket.assignedTo ? ticket.assignedTo.name : '-'}</td>
                    <td>{new Date(ticket.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No recent tickets</p>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;