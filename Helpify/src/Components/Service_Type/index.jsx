import React from 'react';
import { Star, Plus } from 'react-feather';

const ServiceCard = ({ type, onSelect,setprice}) => {
  return (
    <div className="card rounded-4 border-0 shadow-sm h-100">
      <div className="card-body p-3">
        <div className="row">
          {/* Left side with image */}
          <div className="col-3">
            <img 
              src={type.image || "/api/placeholder/100/100"} 
              className="rounded-3 bg-light" 
              style={{ width: '100%', height: 'auto' }}
              alt="service"
            />
          </div>
          
          {/* Middle content */}
          <div className="col-7">
            <h5 className="mb-1 fw-semibold">{type.name}</h5>
            <div className="text-warning mb-1">
              ₹{type.price}/month <span className="text-muted small">starting</span>
            </div>
            <p className="text-muted small mb-1">
              Complete household management, taking care of your...
            </p>
            <small className="text-muted">*All services inclusive</small>
          </div>
          
          {/* Right side with rating and button */}
          <div className="col-2 d-flex flex-column justify-content-between align-items-end">
            <div className="d-flex align-items-center">
              <Star 
                size={16} 
                className="text-warning me-1" 
                fill="currentColor"
              />
              <span className="text-muted">{type.rating}</span>
            </div>
            <button
              onClick={() => {
                onSelect(type);
                setprice(type.price);
                }}
              className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: '32px', 
                height: '32px', 
                padding: 0,
                backgroundColor: '#FFA500',
                border: 'none'
              }}
            >
              <Plus size={20} color="white" />
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ServiceCard

