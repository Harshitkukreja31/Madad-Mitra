import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react';
const index = ({ title, showBack, onBack }) => {
  return (
    <div className="bg-white rounded shadow-sm p-3 mb-3">
    <div className="d-flex align-items-center">
      {showBack && (
        <button
          onClick={onBack}
          className="btn btn-outline-secondary me-3"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      <h1 className="h4 mb-0">{title}</h1>
    </div>
  </div>
  )
}

export default index