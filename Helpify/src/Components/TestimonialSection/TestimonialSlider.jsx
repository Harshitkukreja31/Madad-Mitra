import React from 'react';
import TestimonialCard from './TestimonialCard';

const TestimonialSlider = ({ testimonials, currentIndex, screenWidth }) => {
  const isMobile = screenWidth < 770;
  const getSlideWidth = () => {
    if (isMobile) return '100%';
    return '50%';
  };

  return (
    <div className="col-12 col-md-8">
      <div className="testimonials-slider position-relative overflow-hidden">
        <div 
          className="slider-track d-flex"
          style={{
            transform: `translateX(-${currentIndex * (screenWidth < 768 ? 100 : 50)}%)`,
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard 
              key={idx}
              testimonial={testimonial}
              width={getSlideWidth()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;
