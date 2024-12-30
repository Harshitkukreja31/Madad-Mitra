import React, { useState, useEffect } from 'react';
import './NumberCounter.css'

const NumberCounter = ({ startNum = 0, endNum, heading, duration = 2000 }) => {
  const [count, setCount] = useState(startNum);

  useEffect(() => {
    if (endNum <= startNum) return;

    const steps = 50;
    const stepValue = (endNum - startNum) / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCount(prevCount => {
        const nextValue = startNum + (stepValue * currentStep);
        return currentStep >= steps ? endNum : Math.floor(nextValue);
      });

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [startNum, endNum, duration]);

  return (
    <div className="number-counter-wrapper">
      <div className="number-counter-content">
        <div className="number-counter-value">
          {count}+
        </div>
        <div className="number-counter-heading">
          {heading}
        </div>
      </div>

    </div>
  );
};

export default NumberCounter;