import React from 'react';
import TimeSelector from './TimeSelector';
import DurationSelector from './DurationSelector'

const ShiftTiming = ({
  shiftNumber,
  shift,
  setShift,
  maxHours,
  isSingleShift = false,
  readOnly=false
}) => {
  return (
    <div className="mb-4">
      {!isSingleShift && (
        <DurationSelector
          value={shift.duration}
          onChange={(e) => {
            const newDuration = e.target.value;
            setShift({
              ...shift,
              duration: newDuration,
            });
          }}
          maxHours={maxHours}
          readOnly={readOnly}
        />
      )}

      <div className="row">
        <div className="col-6">
          <TimeSelector
            label="Start Time:"
            value={shift.startTime}
            onChange={(e) => {
              setShift({
                ...shift,
                startTime: e.target.value,
              });
            }}
          />
        </div>
        <div className="col-6">
          <TimeSelector
            label="End Time:"
            value={shift.endTime}
            readOnly={true}
          />
        </div>
      </div>
    </div>
  );
};

export default ShiftTiming;
