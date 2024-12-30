import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrbitingIcons from './OrbitingIcons';
import ServiceCard from './ServiceCard';
import "./AllServiceHero.css";

const AllServiceHero = () => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Replace with your actual backend API endpoint
        const response = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/allServices/');

        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }

        const data = await response.json();
        setServices(data);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Render loading state
  if (isLoading) {
    return (
      <div className="service-hero">
        <div className="sh-hero">
          <div className="sh-loading">
            <p>Loading services...</p>
          </div>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="service-hero">
        <div className="sh-hero">
          <div className="sh-error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="service-hero">
      <div className="sh-hero">
        <div className="position-relative">
          <OrbitingIcons />
          <div className="sh-hero__content">
            <h1 className="sh-hero__title">
              Find Your Perfect
              <span className="sh-hero__gradient">
                Helper
              </span>
            </h1>
            <p className="sh-hero__subtitle">
              Professional services at your doorstep
            </p>
          </div>
        </div>
      </div>
      <div className="sh-grid">
        {services.length === 0 ? (
          <div className="sh-no-services">
            <p>No services available at the moment</p>
          </div>
        ) : (
          services.map((service, index) => (
            <ServiceCard 
              key={service._id || index} 
              {...service} 
              icon={
                <div className={`sh-icon ${service.icon?.className || ''}`}>
                  {service.icon?.emoji || ''}
                </div>
              }
            />
          ))
        )}
      </div>
    </div>
  );
};

export default AllServiceHero;