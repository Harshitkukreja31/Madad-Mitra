import React from 'react'
const ROTATING_ICONS = [
    '👩‍🍳', '🧹', '👶', '🧺', '🍳', '🧼', '👩‍👦', '✨'
  ];
  

const OrbitingIcons = () => {
    return (
      <div className="sh-orbit__container">
        {ROTATING_ICONS.map((icon, index) => {
          const delay = (index / ROTATING_ICONS.length) * -20;
          return (
            <div
              key={index}
              className="sh-orbit__item"
              style={{ animationDelay: `${delay}s` }}
            >
              <div 
                className="sh-orbit__icon"
                style={{ animationDelay: `${delay}s` }}
              >
                {icon}
              </div>
            </div>
          );
        })}
      </div>
    );
  };
  

export default OrbitingIcons
