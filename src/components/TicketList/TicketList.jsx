// components/TicketList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './TicketList.css';

const API_URL = 'https://helpdesk-backend-production.up.railway.app/api';

function TicketList({ user }) {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    category: ''
  });
  const [deleteLoading, setDeleteLoading] = useState(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, tickets]);

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(response.data.tickets);
      setFilteredTickets(response.data.tickets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    if (filters.status) {
      filtered = filtered.filter(t => t.status === filters.status);
    }
    if (filters.priority) {
      filtered = filtered.filter(t => t.priority === filters.priority);
    }
    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    setFilteredTickets(filtered);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const clearFilters = () => {
    setFilters({
      status: '',
      priority: '',
      category: ''
    });
  };

  const handleDelete = async (ticketId, ticketTitle, e) => {
    e.preventDefault(); // Prevent navigation to ticket details
    e.stopPropagation(); // Stop event bubbling

    // Confirm before deleting
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ticket "${ticketTitle}"?\n\nThis action cannot be undone.`
    );

    if (!confirmDelete) return;

    setDeleteLoading(ticketId);

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/tickets/${ticketId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Remove ticket from state
      setTickets(tickets.filter(t => t._id !== ticketId));
      setFilteredTickets(filteredTickets.filter(t => t._id !== ticketId));
      
      alert('Ticket deleted successfully!');
    } catch (error) {
      console.error('Error deleting ticket:', error);
      alert('Failed to delete ticket. ' + (error.response?.data?.error || 'Please try again.'));
    } finally {
      setDeleteLoading(null);
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
    return <div className="loading">Loading tickets...</div>;
  }

  return (
    <div className="ticket-list-container">
      <div className="ticket-list-header">
        <div>
          <h1>
            {user.role === 'user' ? 'My Tickets' : 
             user.role === 'agent' ? 'Assigned Tickets' : 
             'All Tickets'}
          </h1>
          <p>{filteredTickets.length} ticket(s) found</p>
        </div>
        {user.role === 'user' && (
          <Link to="/tickets/create" className="btn btn-primary">
            ➕ Create New Ticket
          </Link>
        )}
      </div>

      <div className="filters-section">
        <div className="filters">
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Closed">Closed</option>
          </select>

          <select name="priority" value={filters.priority} onChange={handleFilterChange}>
            <option value="">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Critical">Critical</option>
          </select>

          <select name="category" value={filters.category} onChange={handleFilterChange}>
            <option value="">All Categories</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="General">General</option>
          </select>

          <button onClick={clearFilters} className="btn btn-secondary">
            Clear Filters
          </button>
        </div>
      </div>

      {filteredTickets.length === 0 ? (
        <div className="empty-state">
          <h3>No tickets found</h3>
          <p>Try adjusting your filters or create a new ticket</p>
          {user.role === 'user' && (
            <Link to="/tickets/create" className="btn btn-primary">
              Create New Ticket
            </Link>
          )}
        </div>
      ) : (
        <div className="tickets-grid">
          {filteredTickets.map(ticket => (
            <Link to={`/tickets/${ticket._id}`} key={ticket._id} className="ticket-card">
              <div className="ticket-card-header">
                <span className="ticket-id">{ticket.ticketId}</span>
                <div className="ticket-card-badges">
                  <span 
                    className="badge" 
                    style={{ backgroundColor: getPriorityColor(ticket.priority) }}
                  >
                    {ticket.priority}
                  </span>
                  {user.role === 'admin' && (
                    <button
                      onClick={(e) => handleDelete(ticket._id, ticket.title, e)}
                      className="delete-btn"
                      disabled={deleteLoading === ticket._id}
                      title="Delete ticket"
                    >
                      {deleteLoading === ticket._id ? '⏳' : '🗑️'}
                    </button>
                  )}
                </div>
              </div>

              <h3 className="ticket-title">{ticket.title}</h3>
              <p className="ticket-description">
                {ticket.description.substring(0, 100)}
                {ticket.description.length > 100 ? '...' : ''}
              </p>

              <div className="ticket-card-footer">
                <div className="ticket-meta">
                  <span className="ticket-category">📂 {ticket.category}</span>
                  <span 
                    className="ticket-status" 
                    style={{ color: getStatusColor(ticket.status) }}
                  >
                    ● {ticket.status}
                  </span>
                </div>
                <div className="ticket-info">
                  <small>Created: {new Date(ticket.createdAt).toLocaleDateString()}</small>
                  {ticket.assignedTo && (
                    <small>Agent: {ticket.assignedTo.name}</small>
                  )}
                </div>
              </div>

              <div className="ticket-sla">
                <small>
                  Due: {new Date(ticket.sla.dueDate).toLocaleString()}
                </small>
                {new Date() > new Date(ticket.sla.dueDate) && 
                 ticket.status !== 'Resolved' && 
                 ticket.status !== 'Closed' && (
                  <span className="overdue-badge">⚠️ Overdue</span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TicketList;