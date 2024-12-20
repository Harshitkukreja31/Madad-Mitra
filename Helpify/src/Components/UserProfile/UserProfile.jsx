import React, { useState } from 'react';
import IdentitySection from './IdentitySection';
import './UserProfile.css';

// Icons can be replaced with Bootstrap icons or Font Awesome
import { FaUser, FaMapMarkerAlt, FaCog, FaEdit, FaSave, FaTimes } from 'react-icons/fa';

const UserProfile = () => {
  const [activeSection, setActiveSection] = useState('identity');
  const [userData, setUserData] = useState({
    name: 'Emma Rodriguez',
    email: 'emma.rodriguez@example.com',
    phone: '+1 (555) 123-4567',
    avatar: '',
    services: [
      { 
        id: 1,
        address: '123 Main St, Apt 4B', 
        services: ['Internet', 'Electricity'],
        provider: 'City Utilities',
        startDate: '2023-01-15'
      },
      { 
        id: 2,
        address: '456 Tech Lane, Suite 200', 
        services: ['Cloud Storage', 'Managed IT'],
        provider: 'TechConnect Solutions',
        startDate: '2022-11-01'
      }
    ]
  });

  const renderSection = () => {
    switch(activeSection) {
      case 'identity':
        return <IdentitySection userData={userData} />;
      case 'services':
        return <ServicesSection services={userData.services} />;
      case 'settings':
        return <SettingsSection 
          userData={userData} 
          onUpdateUser={setUserData} 
        />;
      default:
        return <IdentitySection userData={userData} />;
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
                { id: 'settings', icon: FaCog, label: 'Settings' }
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


// Services Section Component
const ServicesSection = ({ services }) => (
  <div className="tab-pane fade show active">
    <h2 className="mb-4">Active Services</h2>
    <div className="row">
      {services.map((service) => (
        <div key={service.id} className="col-md-6 mb-4">
          <div className="card service-card">
            <div className="card-body">
              <h5 className="card-title">{service.address}</h5>
              <div className="row mb-3">
                <div className="col-6">
                  <small className="text-muted">Provider</small>
                  <p className="fw-bold">{service.provider}</p>
                </div>
                <div className="col-6">
                  <small className="text-muted">Start Date</small>
                  <p className="fw-bold">
                    {new Date(service.startDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div>
                <small className="text-muted">Services</small>
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {service.services.map((item, idx) => (
                    <span key={idx} className="badge bg-primary">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Settings Section Component
const SettingsSection = ({ userData, onUpdateUser }) => {
  const [editData, setEditData] = useState({
    name: userData.name,
    email: userData.email,
    phone: userData.phone
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUser(prev => ({ ...prev, ...editData }));
    setIsEditing(false);
  };

  return (
    <div className="tab-pane fade show active">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="m-0">Account Settings</h2>
            <div>
              {!isEditing ? (
                <button 
                  className="btn btn-outline-primary"
                  onClick={() => setIsEditing(true)}
                >
                  <FaEdit /> Edit
                </button>
              ) : (
                <button 
                  className="btn btn-outline-danger"
                  onClick={() => setIsEditing(false)}
                >
                  <FaTimes /> Cancel
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {[
              { name: 'name', label: 'Full Name', type: 'text' },
              { name: 'email', label: 'Email', type: 'email' },
              { name: 'phone', label: 'Phone Number', type: 'tel' }
            ].map((field) => (
              <div key={field.name} className="mb-3">
                <label 
                  htmlFor={field.name} 
                  className="form-label"
                >
                  {field.label}
                </label>
                <input
                  type={field.type}
                  className="form-control"
                  id={field.name}
                  name={field.name}
                  value={editData[field.name]}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            ))}
            
            {isEditing && (
              <button 
                type="submit" 
                className="btn btn-primary w-100"
              >
                <FaSave className="me-2" /> Save Changes
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;