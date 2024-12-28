import React ,{useMemo} from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './style.css';
const Calendar = ({ currentDate, setCurrentDate, selectedDate, setSelectedDate }) => {
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };
  const minSelectableDate = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return new Date(date.setHours(0, 0, 0, 0));
  }, []);
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push({ date: null, disabled: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      days.push({
        date,
        disabled: date < minSelectableDate
      });
    }

    return days;
  };
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'next') {
      newDate.setMonth(newDate.getMonth() + 1);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleString('default', { month: 'long', year: 'numeric' });
  };

  const isDateSelected = (date) => {
    return selectedDate && 
           date && 
           date.toDateString() === selectedDate.toDateString();
  };

  return (
    <div className="calendar-wrapper">
        <div className="mb-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h2 className="calendar-header m-0">
              {formatMonthYear(currentDate)}
            </h2>
            <div className="d-flex align-items-center gap-2">
              <button 
                onClick={() => navigateMonth('prev')}
                className="calendar-nav-btn btn"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => navigateMonth('next')}
                className="calendar-nav-btn btn"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="calendar-grid mb-2">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
          </div>
          
          <div className="calendar-grid">
            {generateCalendarDays().map((day, index) => (
              <div key={index}>
                <button
                  disabled={!day.date || day.disabled}
                  className={`
                    calendar-day-btn
                    ${!day.date ? 'invisible' : ''}
                    ${!day.disabled && day.date ? 'available' : ''}
                    ${isDateSelected(day.date) ? 'selected' : ''}
                  `}
                  onClick={() => day.date && !day.disabled && setSelectedDate(day.date)}
                >
                  {day.date ? day.date.getDate() : ''}
                </button>
              </div>
            ))}
          </div>

          {minSelectableDate > new Date() && (
            <div className="booking-note">
              * Booking available from {minSelectableDate.toLocaleDateString()}
            </div>
          )}
        </div>
      </div>
  );
};

export default Calendar;
