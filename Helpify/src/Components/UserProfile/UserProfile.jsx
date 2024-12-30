import React, { useState } from 'react';
import IdentitySection from './IdentitySection';
import ServicesDisplay from './ServiceDisplay';
import './UserProfile.css';

// Icons can be replaced with Bootstrap icons or Font Awesome
import { FaUser, FaMapMarkerAlt, FaCog, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('identity');

  const renderSection = () => {
    switch(activeSection) {
      case 'identity':
        return <IdentitySection/>;
      case 'services':
        return <ServicesDisplay/>;
      default:
        return <IdentitySection/>;
    }
  };

  return (
    <div className="user-profile-container">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-10 profile-wrapper">
            {/* Navigation Tabs */}
            <ul className="nav nav-tabs mb-4">
              {[
                { id: 'identity', icon: FaUser, label: 'Identity' },
                { id: 'services', icon: FaMapMarkerAlt, label: 'Services' },
             
              ].map((tab) => (
                <li key={tab.id} className="nav-item">
                  <button 
                    className={`nav-link ${activeSection === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveSection(tab.id)}
                  >
                    <tab.icon className="me-2" />
                    {tab.label}
                  </button>
                </li>
              ))}
            </ul>

            {/* Dynamic Section Rendering */}
            <div className="tab-content">
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};



export default UserProfile;