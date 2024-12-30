import React, { useState } from 'react';
import Submit from '../Submit/index.jsx'

const SelectionForm = ({ questions, setFormData, setprice, setSelectedQues, price, duration }) => {
  const [requirement, setrequirement] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handleOptionSelect = (category, option) => {
    // Check if the option is already selected
    const isCurrentlySelected = requirement[category] === option.name;

    // Create a new requirement object
    const newrequirement = { ...requirement };

    if (isCurrentlySelected) {
      // If deselecting, remove the category
      delete newrequirement[category];
      
      // Subtract the option's price
      setprice(prevPrice => prevPrice - option.price);
    } else {
      // If selecting a new option, remove any previous selection in this category
      // Subtract the price of the previous option if it exists
      if (requirement[category]) {
        const previousOption = questions[category].find(
          opt => opt.name === requirement[category]
        );
        if (previousOption) {
          setprice(prevPrice => prevPrice - previousOption.price);
        }
      }

      // Set the new option
      newrequirement[category] = option.name;
      
      // Add the new option's price
      setprice(prevPrice => prevPrice + option.price);
    }

    // Update the form data
    setrequirement(newrequirement);
  };

  // Check if all categories have a selected option
  const isAllSelected = Object.keys(questions).every(category => 
    requirement[category] !== undefined
  );

  const handleSubmit = () => {
    if (isAllSelected) {
      setFormData((prevData) => ({
        ...prevData,
        requirements: requirement
      }));
      setSelectedQues(true);
    } else {
      setShowModal(true);
    }
  };

  const missingCategories = Object.keys(questions).filter(
    category => requirement[category] === undefined
  );

  return (
    <div className="container-fluid mb-4">
      {/* Validation Modal */}
      {showModal && (
        <div 
          className="modal" 
          tabIndex="-1" 
          style={{ 
            display: 'block', 
            backgroundColor: 'rgba(0,0,0,0.5)', 
            position: 'fixed', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            zIndex: 1050 
          }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Incomplete Selection</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Please select an option for the following categories:</p>
                <ul>
                  {missingCategories.map(category => (
                    <li key={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div 
        className="overflow-auto" 
        style={{ 
          maxHeight: '450px',
          overflowY: 'auto'
        }}
      >
        {Object.entries(questions).map(([category, options]) => (
          <div key={category} className="card mb-3 p-3 shadow-sm">
            <div className="mb-2">
              <label className="form-label text-secondary">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </label>
              <div className="small text-muted">
                Select 1 out of {options.length} options
              </div>
            </div>
            
            <div className="d-flex flex-wrap gap-2">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleOptionSelect(category, option)}
                  className={`
                    btn rounded-pill px-3 py-2
                    ${
                      requirement[category] === option.name
                        ? 'btn-warning text-white border-warning'
                        : 'btn-outline-secondary'
                    }
                  `}
                  style={{
                    fontSize: '0.9rem',
                    transition: 'all 0.2s'
                  }}
                >
                  {option.name}
                  {requirement[category] === option.name && (
                    <span className="ms-2">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Submit 
        price={price} 
        duration={duration} 
        handlefunc={handleSubmit}
      />
    </div>
  );
};

export default SelectionForm;