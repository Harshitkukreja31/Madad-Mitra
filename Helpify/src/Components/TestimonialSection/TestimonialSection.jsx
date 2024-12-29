import React, { useState, useEffect } from 'react';
import TestimonialSlider from './TestimonialSlider';
import './TestimonialSection.css';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8084/testimonials');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Validate data
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(data);
          setError(null);
        } else {
          setError('No testimonials found');
        }
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to fetch testimonials');
        setTestimonials([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Ensure we have testimonials before setting up interval
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        // Use testimonials.length to cycle through
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [testimonials]);

  // Loading state
  if (isLoading) {
    return <div>Loading testimonials...</div>;
  }

  // Error state
  if (error) {
    return <div>Error: {error}</div>;
  }

  // No testimonials
  if (testimonials.length === 0) {
    return <div>No testimonials available</div>;
  }

  return (
    <section className="testimonials-section position-relative">
      {/* Background Patterns */}
      <div className="background-pattern position-absolute">
        <div className="circles-pattern position-absolute">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="circle position-absolute rounded-circle"
              style={{
                width: `${Math.random() * (screenWidth < 768 ? 100 : 200) + 50}px`,
                height: `${Math.random() * (screenWidth < 768 ? 100 : 200) + 50}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.5,
                transform: `scale(${Math.random() * 1 + 0.5})`,
              }}
            />
          ))}
        </div>

        <svg 
          className="wave-pattern position-absolute bottom-0 start-0 w-100"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path 
            fill="#60A5FA"
            d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,144C672,139,768,85,864,69.3C960,53,1056,75,1152,96C1248,117,1344,139,1392,149.3L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>

        <div className="quote-container position-absolute text-center w-100">
          <p className="quote-text">
            "Testimonials describe what has been, <br className="d-none d-md-block" />
            and are a promise of what is to come."
          </p>
        </div>

        <div className="dots-pattern position-absolute" />
      </div>

      {/* Content */}
      <div className="content-wrapper position-relative container py-5">
        <div className="row g-4">
          {/* Left Side - Headers */}
          <div className="col-12 col-md-4 d-flex flex-column justify-content-center text-center text-md-start mb-4 mb-md-0">
            <h3 className="mb-4 animate-fade-in">
              Don't Believe Us?
            </h3>
            <h4 className="animate-fade-in delay-100">
              Check What Our Customers Say About Us
            </h4>
            
            {/* Indicator Dots */}
            <div className="indicator-dots d-flex flex-column gap-2 mt-4 align-items-center align-items-md-start">
              {testimonials.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                  style={{ cursor: 'pointer' }}
                />
              ))}
            </div>
          </div>

          {/* Testimonial Slider */}
          <TestimonialSlider 
            testimonials={testimonials}
            currentIndex={currentIndex}
            screenWidth={screenWidth}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;