import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, UserCheck, Home, PhoneCall, Calendar, CheckCircle 
} from 'lucide-react';
import StepColumn from './StepColumn';
import "./ServiceTimeline.css";

const ServiceTimeline = () => {
  const [leftColumnSteps, setLeftColumnSteps] = useState([]);
  const [rightColumnSteps, setRightColumnSteps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const timelineRef = useRef(null);
 
  useEffect(() => {
    const fetchTimelineSteps = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8084/serviceTimeline');
       
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
       
        const data = await response.json();
        setLeftColumnSteps(data.leftColumnSteps);
        setRightColumnSteps(data.rightColumnSteps);
        setIsLoading(false);
       
      } catch (err) {
        setError('Failed to fetch timeline steps');
        setIsLoading(false);
        console.error('Fetch error:', err);
      }
    };
    
    fetchTimelineSteps();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );
    
    const timelineSteps = document.querySelectorAll('.timeline-step');
    timelineSteps.forEach((step) => observer.observe(step));
   
    const headerSection = document.querySelector('.header-section');
    if (headerSection) {
      observer.observe(headerSection);
    }
    
    return () => {
      timelineSteps.forEach((step) => observer.unobserve(step));
      if (headerSection) {
        observer.unobserve(headerSection);
      }
    };
  }, [leftColumnSteps, rightColumnSteps]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="timeline-container" ref={timelineRef}>
      <div className="header-section">
        <h1 className="gradient-text">MADAD-MITRA Process Flow</h1>
        <div className="gradient-line"></div>
      </div>
      <div className="timeline-content">
        <StepColumn steps={leftColumnSteps} />
        <StepColumn steps={rightColumnSteps} isRightColumn />
      </div>
    </div>
  );
};

export default ServiceTimeline;