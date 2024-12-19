import React from 'react';

const DurationSelector = ({ value, onChange, maxHours, readOnly = false }) => {
  const generateDurationOptions = (maxHours) => {
    const options = [];
    for (let hour = 1; hour <= maxHours; hour++) {
      options.push(`${hour} hr${hour > 1 ? 's' : ''}`);
      if (hour < maxHours) {
        options.push(`${hour} hr${hour > 1 ? 's' : ''} 30 mins`);
      }
    }
    return options;
  };

  if (readOnly) {
    return (
      <div className="mb-3">
        <div className="text-muted small mb-1">Shift Duration (Auto calculated)</div>
        <input
          type="text"
          className="form-control text-muted"
          value={value}
          readOnly
        />
      </div>
    );
  }

  return (
    <div className="mb-3">
      <select
        className="form-select text-danger"
        value={value}
        onChange={onChange}
      >
        {generateDurationOptions(maxHours).map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DurationSelector;