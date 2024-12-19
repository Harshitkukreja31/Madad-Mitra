import React from 'react';

const TimeSelector = ({ label, value, onChange, readOnly = false }) => {
  return (
    <div>
      <label className="form-label text-muted small">{label}</label>
      {readOnly ? (
        <input
          type="text"
          className="form-control text-muted"
          value={value}
          readOnly
        />
      ) : (
        <select
          className="form-select text-danger"
          value={value}
          onChange={onChange}
        >
          {Array.from({ length: 18 }).map((_, i) => {
            const hour = (i + 7) % 12 || 12; 
            const period = i + 7 < 12 ? 'AM' : 'PM';
            return (
              <option key={i} value={`${hour}:00 ${period}`}>
                {`${hour}:00 ${period}`}
              </option>
            );
          })}
        </select>
      )}
    </div>
  );
};

export default TimeSelector;