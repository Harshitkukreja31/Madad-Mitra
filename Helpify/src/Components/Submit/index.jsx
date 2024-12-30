import React from 'react'

const index = ({price , duration , handlefunc}) => {
  return (
    <div className="card p-3 shadow-sm mt-3">
    <div className="d-flex justify-content-between align-items-center">
      <div>
        <span className="text-secondary fs-6">Monthly Salary ~</span>
        <span className="text-warning  fw-bold fs-4">{price}</span>
        <span className="text-secondary fs-6"> approx.</span>
      </div>
      <div>
        <span className="text-secondary fs-6">Daily Working Hours ~</span>
        <span className="text-warning fw-bold fs-4">{duration}</span>
        <span className="text-secondary fs-6"> approx.</span>
      </div>
        <button
          onClick={handlefunc}
          className="btn btn-warning text-white px-5"
        >
          Proceed
        </button>
    </div>
    <p className="text-muted small mt-2 mb-0">*estimate varies with workload, shifts, timings and location</p>
  </div>
  )
}

export default index