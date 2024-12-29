import React from 'react';

const TestimonialCard = ({ testimonial, width }) => {
  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index} 
        className={`star ${index < rating ? "star-filled" : "star-empty"}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div 
      className="testimonial-card"
      style={{ width, padding: `0 ${width === '100%' ? '0.5rem' : '1rem'}` }}
    >
      <div className="card h-100 p-3 p-md-4">
        <div className="d-flex align-items-center gap-3 mb-3">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="profile-image rounded-circle"
          />
          <div>
            <h3 className="card-name">{testimonial.name}</h3>
            <div className="rating-stars">
              {renderStars(testimonial.rating)}
            </div>
          </div>
        </div>
        <h4 className="card-title">{testimonial.title}</h4>
        <p className="card-text">{testimonial.text}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;