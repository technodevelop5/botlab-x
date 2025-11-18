import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, TrendingUp, Users, Target, MessageSquare } from 'lucide-react';
import '../styles/pages.css';

const CaseStudies = () => {
  const caseStudies = [
    {
      title: "Improving E-commerce Checkout Experience",
      company: "Demo Retail Company",
      challenge: "High cart abandonment rate during checkout process",
      solution: "Conducted conversational usability testing with 200+ participants",
      results: [
        "32% reduction in checkout time",
        "SUS score improved from 68 to 85",
        "25% increase in completion rate"
      ],
      participants: "247",
      duration: "3 weeks"
    },
    {
      title: "Mobile Banking App Redesign Validation",
      company: "Demo Financial Services",
      challenge: "Users struggling with new interface complexity",
      solution: "Multi-phase testing with SUS and AttrakDiff questionnaires",
      results: [
        "Hedonic quality score: 1.8 (positive)",
        "Task completion rate: 94%",
        "User satisfaction increased 45%"
      ],
      participants: "156",
      duration: "4 weeks"
    },
    {
      title: "Customer Support Chatbot Optimization",
      company: "Demo Tech Support",
      challenge: "Low user engagement with AI chatbot",
      solution: "Conversational flow testing with real-time feedback collection",
      results: [
        "Response accuracy improved 67%",
        "Average resolution time: 6.2 min",
        "Customer satisfaction: 4.7/5"
      ],
      participants: "312",
      duration: "2 weeks"
    }
  ];

  return (
    <div className="page-container">
      {/* Header */}
      <div className="page-header">
        <div className="page-header-content">
          <Link to="/" className="page-back-link">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>
          <div className="page-icon">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="page-title">Case Studies</h1>
          <p className="page-subtitle">
            Real-world examples of UX research conducted with BotLabX
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="page-content">
        <div className="page-content-wrapper">
          {/* Academic Notice */}
          <div className="page-notice">
            <MessageSquare className="w-5 h-5" />
            <div>
              <strong>Demonstration Cases:</strong> These are fictional case studies created for academic illustration of research methodologies and platform capabilities.
            </div>
          </div>

          {/* Case Studies */}
          <div className="case-studies-list">
            {caseStudies.map((study, i) => (
              <div key={i} className="case-study-card">
                <div className="case-study-header">
                  <h3 className="case-study-title">{study.title}</h3>
                  <span className="case-study-company">{study.company}</span>
                </div>

                <div className="case-study-section">
                  <div className="case-study-label">
                    <Target className="w-4 h-4" />
                    Challenge
                  </div>
                  <p className="case-study-text">{study.challenge}</p>
                </div>

                <div className="case-study-section">
                  <div className="case-study-label">
                    <MessageSquare className="w-4 h-4" />
                    Solution
                  </div>
                  <p className="case-study-text">{study.solution}</p>
                </div>

                <div className="case-study-section">
                  <div className="case-study-label">
                    <TrendingUp className="w-4 h-4" />
                    Results
                  </div>
                  <ul className="case-study-results">
                    {study.results.map((result, j) => (
                      <li key={j} className="case-study-result">{result}</li>
                    ))}
                  </ul>
                </div>

                <div className="case-study-meta">
                  <div className="case-study-stat">
                    <Users className="w-4 h-4" />
                    <span>{study.participants} participants</span>
                  </div>
                  <div className="case-study-stat">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{study.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="page-cta">
            <h3 className="page-cta-title">Ready to Start Your Research?</h3>
            <p className="page-cta-text">
              Use BotLabX to conduct your own UX research studies with validated methodologies
            </p>
            <Link to="/signup" className="page-cta-button">
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStudies;