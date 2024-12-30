import React, { useState , useEffect } from 'react';
import { MapPin, Calendar, Clock, Home, Building, ChevronDown, ChevronUp } from 'lucide-react';

const ServiceCard = ({ booking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex align-items-center">
            {booking.address.label === 'Home' ? (
              <Home className="text-primary me-2" />
            ) : (
              <Building className="text-primary me-2" />
            )}
            <h5 className="card-title mb-0">{booking.address.label}</h5>
          </div>
          <span className="badge bg-primary text-light">{booking.service}</span>
        </div>

        <div className="d-flex align-items-center text-muted mb-3">
          <MapPin className="me-2" />
          <span>
            {booking.address.streetAddress}, {booking.address.city}
          </span>
        </div>

        <div className="row text-muted mb-3">
          <div className="col-5 d-flex align-items-center">
            <Calendar className="me-2" />
            <span>{formatDate(booking.Date || booking.date)}</span>
          </div>
          <div className="col-7 d-flex align-items-center">
            <Clock className="me-2" />
            <span>{booking.ShiftTime1.join(' - ')}</span>
            {booking.ShiftTime2 && booking.ShiftTime2.length > 0 && <span className="ms-3">{booking.ShiftTime2.join(' - ')}</span>}
          </div>

          
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="btn btn-link p-0 text-primary d-flex align-items-center"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="me-1" /> Hide Details
            </>
          ) : (
            <>
              <ChevronDown className="me-1" /> Show Details
            </>
          )}
        </button>

        {isExpanded && (
          <div className="mt-3 pt-3 border-top">
            {Object.entries(booking.requirement).map(([key, value]) => (
              <div key={key} className="row mb-2">
                <div className="col-6 text-muted">{key.replace(/_/g, ' ')}</div>
                <div className="col-6">{value}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ServicesDisplay = () => {
  const [bookingData , setbookingData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
      fetchbookingdata();
  },[]);
   
  const fetchbookingdata = async()=>{
    try{
        const token = localStorage.getItem('authToken');
        const response = await fetch("http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/bookingdata",{
          headers:{
            'Authorization':token
          }
        })
          
        if(!response.ok){
          throw new Error('Failed to fetch Booking data');
        }
  
        const bookingres = await response.json();
        console.log(bookingres);
        setbookingData(bookingres);
        setLoading(false);  
      }
      catch (error){
        console.log(error);
      }
  }
  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Services</h2>
        <span className="text-muted">{bookingData.length} services</span>
      </div>

      <div className="row g-4">
        {bookingData.map((booking) => (
          <div key={booking._id} className="col-12 col-md-6">
            <ServiceCard booking={booking} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesDisplay;