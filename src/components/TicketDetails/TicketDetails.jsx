// components/TicketDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './TicketDetails.css';

const API_URL = 'http://localhost:5000/api';

function TicketDetails({ user }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTicketDetails();
  }, [id]);

  const fetchTicketDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tickets/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTicket(response.data.ticket);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ticket:', error);
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${API_URL}/tickets/${id}/status`,
        { status: newStatus },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      fetchTicketDetails();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${API_URL}/tickets/${id}/comments`,
        { text: comment },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setComment('');
      fetchTicketDetails();
    } catch (error) {
      console.error('Error adding comment:', error);
      alert('Failed to add comment');
    } finally {
      setSubmitting(false);
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
    return <div className="loading">Loading ticket details...</div>;
  }

  if (!ticket) {
    return <div className="error-message">Ticket not found</div>;
  }

  const canUpdateStatus = user.role === 'agent' || user.role === 'admin';
  const isOverdue = new Date() > new Date(ticket.sla.dueDate) && 
                    ticket.status !== 'Resolved' && 
                    ticket.status !== 'Closed';

  return (
    <div className="ticket-details-container">
      <button onClick={() => navigate('/tickets')} className="btn btn-back">
        ← Back to Tickets
      </button>

      <div className="ticket-details-card">
        <div className="ticket-header">
          <div>
            <h1>{ticket.title}</h1>
            <p className="ticket-id">{ticket.ticketId}</p>
          </div>
          <div className="ticket-badges">
            <span 
              className="badge badge-large" 
              style={{ backgroundColor: getPriorityColor(ticket.priority) }}
            >
              {ticket.priority}
            </span>
            <span 
              className="badge badge-large" 
              style={{ backgroundColor: getStatusColor(ticket.status) }}
            >
              {ticket.status}
            </span>
            {isOverdue && (
              <span className="badge badge-overdue">⚠️ Overdue</span>
            )}
          </div>
        </div>

        <div className="ticket-info-grid">
          <div className="info-item">
            <label>Category</label>
            <p>📂 {ticket.category}</p>
          </div>
          <div className="info-item">
            <label>Created By</label>
            <p>👤 {ticket.createdBy.name}</p>
          </div>
          <div className="info-item">
            <label>Created On</label>
            <p>📅 {new Date(ticket.createdAt).toLocaleString()}</p>
          </div>
          <div className="info-item">
            <label>SLA Due Date</label>
            <p style={{ color: isOverdue ? '#f44336' : 'inherit' }}>
              ⏰ {new Date(ticket.sla.dueDate).toLocaleString()}
            </p>
          </div>
          <div className="info-item">
            <label>Assigned To</label>
            <p>{ticket.assignedTo ? `👨‍💼 ${ticket.assignedTo.name}` : 'Not assigned'}</p>
          </div>
          {ticket.resolvedAt && (
            <div className="info-item">
              <label>Resolved On</label>
              <p>✅ {new Date(ticket.resolvedAt).toLocaleString()}</p>
            </div>
          )}
        </div>

        <div className="ticket-description">
          <h3>Description</h3>
          <p>{ticket.description}</p>
        </div>

        {canUpdateStatus && (
          <div className="status-actions">
            <h3>Update Status</h3>
            <div className="status-buttons">
              {ticket.status === 'Open' && (
                <button 
                  onClick={() => handleStatusChange('In Progress')} 
                  className="btn btn-primary"
                >
                  Start Working
                </button>
              )}
              {ticket.status === 'In Progress' && (
                <>
                  <button 
                    onClick={() => handleStatusChange('Resolved')} 
                    className="btn btn-success"
                  >
                    Mark as Resolved
                  </button>
                  <button 
                    onClick={() => handleStatusChange('Open')} 
                    className="btn btn-secondary"
                  >
                    Move to Open
                  </button>
                </>
              )}
              {ticket.status === 'Resolved' && (
                <button 
                  onClick={() => handleStatusChange('Closed')} 
                  className="btn btn-secondary"
                >
                  Close Ticket
                </button>
              )}
            </div>
          </div>
        )}

        <div className="comments-section">
          <h3>Comments ({ticket.comments?.length || 0})</h3>

          <form onSubmit={handleAddComment} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Comment'}
            </button>
          </form>

          <div className="comments-list">
            {ticket.comments && ticket.comments.length > 0 ? (
              ticket.comments.map((c, index) => (
                <div key={index} className="comment">
                  <div className="comment-header">
                    <strong>{c.user.name}</strong>
                    <span className="comment-date">
                      {new Date(c.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p>{c.text}</p>
                </div>
              ))
            ) : (
              <p className="no-comments">No comments yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketDetails;