import React,{useState} from 'react';
import Login from '../Login/AuthForm.jsx';
const CitySelector = ({ cities, onCitySelect, selectedCity }) => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const handlesubmit = (city)=>{
    if(!localStorage.authToken){
      setIsAuthModalOpen(true);
    }
    else{
      onCitySelect(city);
    }
  }
  return (
    <div className="container my-5">
      {/* Header Section */}
      <div className="text-center mb-4">
        <h2 className="fw-bold mb-3">Select your city</h2>
        <p className="text-muted">I'm looking for a broomee in</p>
      </div>

      {/* Cities Grid */}
      <div className="row justify-content-center g-4">
        {cities.map((city) => (
          <div key={city._id} className="col-6 col-md-4 col-lg-2">
            <div 
              onClick={()=>{handlesubmit(city)}}
              className="d-flex flex-column align-items-center"
              style={{ cursor: 'pointer' }}
            >
              {/* City Icon Circle */}
              <div className={`city-icon-wrapper mb-2 ${
                selectedCity?._id === city._id ? 'selected' : ''
              }`}>
                <img 
                  src={city.image} 
                  alt={`${city.name} icon`}
                  className="city-icon"
                />
              </div>
              {/* City Name */}
              <span className="fw-medium">{city.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-center mt-4">
        <p className="text-muted">Select the location where you'd like to book a Broomee</p>
      </div>

      {isAuthModalOpen && (
        <Login isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      )}

      {/* Add this CSS in your stylesheet */}
      <style>
        {`
          .city-icon-wrapper {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            border: 2px solid #dee2e6;
            overflow: hidden;
            position: relative;
            transition: all 0.3s ease;
            background: white;
          }

          .city-icon-wrapper:hover {
            border-color: #ffa500;
            transform: scale(1.05);
          }

          .city-icon-wrapper.selected {
            border-color: #ffa500;
            background-color: #fff8e8;
          }

          .city-icon {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }
        `}
      </style>
    </div>
  );
};

export default CitySelector;