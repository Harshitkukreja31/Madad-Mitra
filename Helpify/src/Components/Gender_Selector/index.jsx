import React from 'react'

const index = ({ selectedGender, onGenderSelect }) => {
  return (
    <div className="bg-white rounded p-3 mb-4">
    <div className="small text-muted mb-2">Gender</div>
    <div className="d-flex gap-2">
      {['female', 'male'].map((gender) => (
        <button
          key={gender}
          onClick={() => onGenderSelect(gender)}
          className={`btn rounded-pill ${selectedGender === gender ? 'btn-warning text-white' : 'btn-outline-secondary'}`}
        >
          {gender.charAt(0).toUpperCase() + gender.slice(1)}
        </button>
      ))}
    </div>
  </div>
  )
}

export default index