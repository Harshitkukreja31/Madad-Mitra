import React from 'react'
import { Star, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ rating, icon, category, description, href }) => (
    <Link to={href} className="sh-card group">
      <div className="sh-card__body">
        <div className="sh-card__rating">
          <Star className="sh-card__star" />
          <span className="sh-card__rating-text">{rating}</span>
        </div>
  
        <div className="sh-card__icon-wrapper">
          {icon}
        </div>
  
        <h3 className="sh-card__title">{category}</h3>
        <p className="sh-card__description">{description}</p>
  
        <div className="sh-card__footer">
          <div className="sh-card__book-button">
            <span>Book Now</span>
            <ArrowUpRight className="sh-card__arrow" />
          </div>
        </div>
      </div>
    </Link>
  );

export default ServiceCard
