import React from 'react';
import ReactPlayer from 'react-player/lazy';
import { motion } from 'framer-motion';
import './ServiceHeroSection.css';
import NumberCounter from './NumberCounter';


const ServiceHeroSection = ({ service }) => {
  const textAnimation = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const summaryChars = service.summary.split('');

  return (
    <div className="hero-section">
      {/* Background Elements */}
      <div className="hero-background">
        <div className="hero-wave-top"></div>
        <div className="hero-wave-bottom"></div>
      </div>

      {/* Main Content */}
      <div className="container hero-content">
        <div className="row align-items-center gy-4">
          {/* Left Content */}
          <div className="col-lg-6">
            <motion.h1 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="display-4 fw-bold text-gradient mb-4"
            >
              {service.heading}
            </motion.h1>
            
            <div className="lead mb-4">
              {summaryChars.map((char, index) => (
                <motion.span
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={textAnimation}
                  className="d-inline-block"
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Content - Video */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="col-lg-6"
          >
            <div className="video-container">
              <ReactPlayer
                url={service.videoLink}
                playing
                loop
                muted
                width="100%"
                height="100%"
                className="video-player"
                pip={false}
                controls={false}
              />
            </div>
          </motion.div>
        </div>

        {/* Statistics Section */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="row statistics-section mt-5 gy-4"
        >
          {[
            { value: 99631, label: "Certified Workers" },
            { value: 7500, label: "Happy Customers" },
            { value: 150, label: "Pincodes & Counting" }
          ].map((stat, index) => (
            <div className="col-md-4" key={index}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="stat-card h-100"
              >
                <div className="card-body text-center">
                  <NumberCounter
                    startNum={0}
                    endNum={stat.value}
                    heading={stat.label}
                    duration={2000}
                  />
                </div>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceHeroSection;