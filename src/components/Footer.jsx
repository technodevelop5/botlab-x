import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, GraduationCap } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* College Project Banner */}
        <div className="footer-project-banner">
          <div className="footer-project-content">
            <GraduationCap className="w-6 h-6" />
            <div className="footer-project-text">
             
            </div>
          </div>
        </div>

        <div className="footer-grid">
          {/* Brand Column */}
          <div className="footer-brand">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <div className="footer-logo-text">
                <span className="footer-logo-title">BotLabX</span>
                <span className="footer-logo-subtitle">AI-Powered UX Platform</span>
              </div>
            </div>
            <p className="footer-description">
              A comprehensive conversational UX research platform developed for academic exploration. Build chatbots, deploy surveys, and analyze user behavior with validated psychometric instruments.
            </p>
            <div className="footer-social">
              {['T', 'L', 'G'].map((social, i) => (
                <a key={i} href="#" className="footer-social-link">
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Platform Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">Platform</h5>
            <ul className="footer-links">
              <li><a href="#dashboard" className="footer-link">Dashboard</a></li>
              <li><a href="#experiments" className="footer-link">Experiments</a></li>
              <li><a href="#chatbot-editor" className="footer-link">Chatbot Editor</a></li>
              <li><a href="#results" className="footer-link">Results</a></li>
              
            </ul>
          </div>

          {/* Resources Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">Resources</h5>
            <ul className="footer-links">
              <li><Link to="/documentation" className="footer-link">Documentation</Link></li>
            
              <li><Link to="/case-studies" className="footer-link">Case Studies</Link></li>
              <li><Link to="/research-papers" className="footer-link">Research Papers</Link></li>
              <li><Link to="/support" className="footer-link">Support</Link></li>
            </ul>
          </div>

          {/* About Column */}
          <div className="footer-column">
            <h5 className="footer-column-title">About</h5>
            <ul className="footer-links">
              <li><Link to="/about-project" className="footer-link">About Project</Link></li>
              <li><Link to="/research-team" className="footer-link">Research Team</Link></li>
              <li><Link to="/blog" className="footer-link">Blog</Link></li>
              
              <li><Link to="/contact" className="footer-link">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">© 2025 BotLabX - College Research Project. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/imprint" className="footer-legal-link">Imprint</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
