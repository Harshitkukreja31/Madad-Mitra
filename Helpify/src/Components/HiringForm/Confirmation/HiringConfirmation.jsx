import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HiringConfirmation.css';

const HiringConfirmation = () => {
  const navigate = useNavigate();

  const onHomeClick = () => {
    navigate('/'); // Navigates to the home route
  };

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-container">
        {/* Responsive Card */}
        <div className="confirmation-card">
          {/* Responsive Icon Container */}
          <div className="confirmation-icon">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              className="icon-check"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>

          {/* Responsive Content */}
          <div className="confirmation-content">
            <h2 className="confirmation-title">Application Received</h2>
            
            <p className="confirmation-message">
              We extend our sincerest gratitude for your professional interest in joining our esteemed organization. Our dedicated recruitment team will meticulously review your application and will communicate with you regarding the next steps in our comprehensive selection process.
            </p>

            {/* Responsive Information Box */}
            <div className="confirmation-info-box">
              <p className="confirmation-quote">
                "Your potential contribution is of significant value to our organization."
              </p>
            </div>

            {/* Additional Details */}
            <div className="confirmation-details">
              <p>Please retain this confirmation for your records.</p>
              <p>Expected response time: 5-7 business days</p>
            </div>

            {/* Responsive Button */}
            <button 
              onClick={onHomeClick} 
              className="confirmation-home-button"
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringConfirmation;