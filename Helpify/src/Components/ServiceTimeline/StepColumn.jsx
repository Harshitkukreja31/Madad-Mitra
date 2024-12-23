import React from 'react';
import { 
  FileText, UserCheck, Home, PhoneCall, Calendar, CheckCircle 
} from 'lucide-react';

// Icon mapper for dynamic rendering
const IconComponents = {
  FileText,
  UserCheck,
  Home,
  PhoneCall,
  Calendar,
  CheckCircle
};

// Dynamic Icon Renderer
const IconRenderer = ({ iconConfig }) => {
  try {
    const { component, props } = JSON.parse(iconConfig);
    const IconComponent = IconComponents[component];
    return IconComponent ? <IconComponent {...props} /> : null;
  } catch (error) {
    console.error('Error rendering icon:', error);
    return null;
  }
};

const StepColumn = ({ steps, isRightColumn = false }) => (
  <div className={`step-column ${isRightColumn ? 'right-column' : 'left-column'}`}>
    {steps.map((step, index) => (
      <div key={step._id} className="timeline-step">
        <div
          className="timeline-arrow"
          style={{
            '--step-color': step.color,
            '--animation-delay': `${index * 200}ms`
          }}
        >
          <div className="arrow-content">
            <IconRenderer iconConfig={step.icon} />
            <div className="step-text">
              <span className="step-number">{step.number}</span>
              <span className="step-header">{step.header}</span>
            </div>
          </div>
        </div>
        <div className="step-description">
          <p>{step.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default StepColumn;