import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Plus, Search, Edit, Eye, Copy, Archive, MoreVertical, Filter, ChevronDown } from 'lucide-react';
import '../styles/experiments.css';

const ExperimentList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [experiments, setExperiments] = useState([
    {
      id: 1,
      name: "Hotel Booking Chatbot UX Study",
      description: "Testing conversational flow for hotel reservations",
      status: "active",
      participants: 45,
      category: "Chatbot",
      created: "2024-12-01",
      surveys: ["SUS", "CUQ"]
    },
    {
      id: 2,
      name: "Mobile App Onboarding Experience",
      description: "Evaluating first-time user onboarding process",
      status: "draft",
      participants: 0,
      category: "Mobile",
      created: "2024-12-05",
      surveys: ["AttrakDiff"]
    },
    {
      id: 3,
      name: "E-commerce Checkout Flow",
      description: "Analyzing checkout process usability",
      status: "completed",
      participants: 120,
      category: "Web",
      created: "2024-11-20",
      surveys: ["SUS", "AttrakDiff"]
    },
    {
      id: 4,
      name: "Voice Assistant Interaction Study",
      description: "Testing voice commands and responses",
      status: "active",
      participants: 28,
      category: "Voice UI",
      created: "2024-12-03",
      surveys: ["CUQ"]
    }
  ]);

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'status-active';
      case 'draft': return 'status-draft';
      case 'completed': return 'status-completed';
      case 'archived': return 'status-archived';
      default: return '';
    }
  };

  const handleDuplicate = (experiment) => {
    const duplicated = {
      ...experiment,
      id: experiments.length + 1,
      name: `${experiment.name} (Copy)`,
      status: 'draft',
      participants: 0,
      created: new Date().toISOString().split('T')[0]
    };
    setExperiments([...experiments, duplicated]);
  };

  const handleArchive = (id) => {
    setExperiments(experiments.map(exp => 
      exp.id === id ? { ...exp, status: 'archived' } : exp
    ));
  };

  const filteredExperiments = experiments.filter(exp => {
    const matchesSearch = exp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exp.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || exp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="experiments-container">
      {/* Header */}
      <div className="experiments-header">
        <div className="header-left">
          <h1 className="experiments-title">Experiments</h1>
          <p className="experiments-subtitle">Manage your UX research studies</p>
        </div>
        <Link to="/create-experiment" className="btn-primary">
          <Plus className="w-5 h-5" />
          Create Experiment
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="experiments-toolbar">
        <div className="search-box">
          <Search className="search-icon" />
          <input
            type="text"
            placeholder="Search experiments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-dropdown">
            <button 
              className="filter-btn"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter className="w-4 h-4" />
              Status: {filterStatus === 'all' ? 'All' : filterStatus}
              <ChevronDown className="w-4 h-4" />
            </button>
            {showFilterMenu && (
              <div className="filter-menu">
                <button onClick={() => { setFilterStatus('all'); setShowFilterMenu(false); }}>
                  All Experiments
                </button>
                <button onClick={() => { setFilterStatus('active'); setShowFilterMenu(false); }}>
                  Active
                </button>
                <button onClick={() => { setFilterStatus('draft'); setShowFilterMenu(false); }}>
                  Draft
                </button>
                <button onClick={() => { setFilterStatus('completed'); setShowFilterMenu(false); }}>
                  Completed
                </button>
                <button onClick={() => { setFilterStatus('archived'); setShowFilterMenu(false); }}>
                  Archived
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="experiments-stats">
        <div className="stat-card-small">
          <div className="stat-label">Total Experiments</div>
          <div className="stat-value">{experiments.length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label">Active</div>
          <div className="stat-value">{experiments.filter(e => e.status === 'active').length}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label">Total Participants</div>
          <div className="stat-value">{experiments.reduce((sum, e) => sum + e.participants, 0)}</div>
        </div>
        <div className="stat-card-small">
          <div className="stat-label">Completed</div>
          <div className="stat-value">{experiments.filter(e => e.status === 'completed').length}</div>
        </div>
      </div>

      {/* Experiments List */}
      <div className="experiments-list">
        {filteredExperiments.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No experiments found</h3>
            <p>Create your first experiment to get started</p>
            <Link to="/create-experiment" className="btn-primary">
              <Plus className="w-5 h-5" />
              Create Experiment
            </Link>
          </div>
        ) : (
          filteredExperiments.map(experiment => (
            <div key={experiment.id} className="experiment-card">
              <div className="experiment-card-header">
                <div className="experiment-info">
                  <h3 className="experiment-name">{experiment.name}</h3>
                  <p className="experiment-description">{experiment.description}</p>
                </div>
                <span className={`experiment-status ${getStatusColor(experiment.status)}`}>
                  {experiment.status}
                </span>
              </div>

              <div className="experiment-meta">
                <div className="meta-item">
                  <span className="meta-label">Category:</span>
                  <span className="meta-value">{experiment.category}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Participants:</span>
                  <span className="meta-value">{experiment.participants}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Surveys:</span>
                  <span className="meta-value">{experiment.surveys.join(', ')}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Created:</span>
                  <span className="meta-value">{experiment.created}</span>
                </div>
              </div>

              <div className="experiment-actions">
                <button 
                  className="action-btn action-edit"
                  onClick={() => navigate(`/edit-experiment/${experiment.id}`)}
                >
                  <Edit className="w-4 h-4" />
                  Edit
                </button>
                <button 
                  className="action-btn action-view"
                  onClick={() => navigate(`/experiment-results/${experiment.id}`)}
                >
                  <Eye className="w-4 h-4" />
                  View Results
                </button>
                <button 
                  className="action-btn action-duplicate"
                  onClick={() => handleDuplicate(experiment)}
                >
                  <Copy className="w-4 h-4" />
                  Duplicate
                </button>
                <button 
                  className="action-btn action-archive"
                  onClick={() => handleArchive(experiment.id)}
                  disabled={experiment.status === 'archived'}
                >
                  <Archive className="w-4 h-4" />
                  Archive
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ExperimentList;