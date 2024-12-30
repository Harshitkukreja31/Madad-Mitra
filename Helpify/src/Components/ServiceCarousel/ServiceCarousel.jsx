import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Shield, DollarSign, Headphones, Clock, Star, UserCheck } from 'lucide-react';
import './ServiceCarousel.css'

const IconComponents = {
  Shield,
  DollarSign,
  Headphones,
  Clock,
  Star,
  UserCheck
};

// Dynamic Icon Renderer
const IconRenderer = ({ iconConfig }) => {
  try {
    const { component, props } = JSON.parse(iconConfig);
    const IconComponent = IconComponents[component];
    return IconComponent ? <IconComponent {...props} /> : null;
  } catch (error) {
    console.error('Error rendering icon:', error);
    return null;
  }
};
const ServiceCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slides, setSlides] = useState([]);
  useEffect(() => {
    const fetchSlides = async () => {
      try {
       
        const response = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/serviceCarousel');
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        setSlides(data);
       
      } catch (err) {
        setError('Failed to fetch services');
        console.error('Fetch error:', err);
      }
    };

    fetchSlides();
  }, []);

  

  const getVisibleSlides = () => {
    const repeatedSlides = [...slides, ...slides, ...slides];
    const startIdx = currentIndex + slides.length;
    return repeatedSlides.slice(startIdx - 1, startIdx + 2);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered]);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="text-4xl font-bold gradient-title">Why Choose Us?</h1>
        <p className="text-lg text-gray-600">Your need, our commitment—built on trust, driven by care.</p>
      </div>
      
      <div className="position-relative carousel-wrapper" 
           onMouseEnter={() => setIsHovered(true)} 
           onMouseLeave={() => setIsHovered(false)}>
        <button className="carousel-control prev-btn" onClick={prevSlide}>
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="carousel-container">
          {getVisibleSlides().map((slide, index) => (
            <div key={index} className={`theme-card ${slide.color}-gradient`}>
              <div className="card-body text-center">
                <div className="icon-wrapper">
                <IconRenderer iconConfig={slide.icon} />
                </div>
                <h3 className="card-title">{slide.title}</h3>
                <p className="card-text">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control next-btn" onClick={nextSlide}>
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ServiceCarousel;