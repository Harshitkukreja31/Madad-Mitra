import React, { useState, useEffect } from 'react';
import ShiftSelector from '../Shift_Selector/index.jsx'
import Calendar from '../Calender_Selector/index.jsx';
import NotesInput from '../NotesInput/index.jsx';
import Submit from '../Submit/index.jsx';
import { Modal,Button} from 'react-bootstrap';
// import AlertMessages from './AlertMessages';

const WorkShiftsSelector = ({totalDuration , setDateData, onDateSelect,setSubscription , price}) => {

  const calculateEndTime = (startTime, duration) => {
    const [hours, minutes] = startTime.split(':');
    const period = startTime.includes('PM') ? 'PM' : 'AM';
    const durationHours = parseInt(duration.split(' ')[0]);
    const hasHalfHour = duration.includes('30 mins');
    
    let totalMinutes = parseInt(hours) * 60 + parseInt(minutes) + 
                      (durationHours * 60) + (hasHalfHour ? 30 : 0);
    
    let newHours = Math.floor(totalMinutes / 60);
    const newMinutes = totalMinutes % 60;
    let newPeriod = period;
    
    if (newHours > 12) {
      newHours -= 12;
      newPeriod = period === 'AM' ? 'PM' : 'AM';
    }
    
    return `${newHours}:${newMinutes === 0 ? '00' : '30'} ${newPeriod}`;
  };


  const [shifts, setShifts] = useState(1);
  const [firstShift, setFirstShift] = useState({
    duration: `${totalDuration} ${totalDuration > 1 ? 'hrs' : 'hr'}`,
    startTime: '7:00 AM',
    endTime: calculateEndTime('7:00 AM', `${totalDuration} hr${totalDuration > 1 ? 's' : ''}`)
  });
  const [secondShift, setSecondShift] = useState({
    duration: '2 hrs 30 mins',
    startTime: '5:00 PM',
    endTime: '7:30 PM'
  });
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [notes, setNotes] = useState('');
  const [showModal , setModal] = useState(false);
  useEffect(() => {
    // When shifts is 1, update first shift duration to total duration
    if (shifts === 1) {
      setFirstShift(prev => ({
        ...prev,
        duration: `${totalDuration} ${totalDuration > 1 ? 'hrs' : 'hr'}`,
        endTime: calculateEndTime(prev.startTime, `${totalDuration} ${totalDuration > 1 ? 'hrs' : 'hr'}`)
      }));
    }
  }, [shifts, totalDuration]);


  useEffect(() => {
    // Update end times whenever shifts change
    setFirstShift(prev => ({
      ...prev,
      endTime: calculateEndTime(prev.startTime, prev.duration)
    }));
    if (shifts === 2) {
      // Parse hours and check for 30 mins
      const firstDurationMatch = firstShift.duration.match(/(\d+)\s*hr/);
      const firstDurationHours = parseInt(firstDurationMatch[1]);
      const hasHalfHour = firstShift.duration.includes('30 mins');
      
      // Calculate total hours of first shift including half hour if present
      const firstShiftTotalHours = firstDurationHours + (hasHalfHour ? 0.5 : 0);
      const remainingHours =totalDuration - firstShiftTotalHours;
      
      // Format the second shift duration
      const wholeHours = Math.floor(remainingHours);
      const hasRemainingHalfHour = (remainingHours % 1) === 0.5;
      
      const newSecondShiftDuration = `${wholeHours} hr${wholeHours > 1 ? 's' : ''}${hasRemainingHalfHour ? ' 30 mins' : ''}`;
      
      setSecondShift(prev => ({
        ...prev,
        duration: newSecondShiftDuration,
        endTime: calculateEndTime(prev.startTime, newSecondShiftDuration)
      }));
    }
  }, [firstShift.startTime, firstShift.duration, secondShift.startTime, secondShift.duration]);
  
  const handleCloseModal = () => {
    setModal(false); // Close the modal
  };
  const handlesubscription = async () => {
    try {
        const token = localStorage.getItem('authToken');
        const response = await fetch("http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/usersubscription", {
            headers: {
                'Authorization': token
            }
        });
        const data = await response.json();
        console.log(data);


        setSubscription(prevState => {
            if (data.subscription === null) {
                console.log("state update must happen");
                return true;
            }
            return prevState;
        });
    }
    catch (error) {
        console.log(error);
    }
};
  const handleSubmit = ()=>{
    
    if(selectedDate==null){
      setModal(true);
      return;
    }
     if(shifts === 1){
      setDateData(() => ({
        ShiftTime: [firstShift.startTime, firstShift.endTime],
        Date:selectedDate
      }));
     }
     else{
      setDateData(() => ({
        ShiftTime: [firstShift.startTime, firstShift.endTime],
        ShiftTime2: [secondShift.startTime, secondShift.endTime],
        Date:selectedDate
      }));
     }
     onDateSelect(true);

     handlesubscription();

  }
  return (
    <div className="container py-5">

<Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Please select a date</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You must select a date before submitting.
        </Modal.Body>

      </Modal>

    <div className="row">
      <div className="col-md-6 ">
      <div className='card p-3'>
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">Work Shifts</h5>
      <div className="input-group" style={{ maxWidth: '150px' }}>
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShifts(Math.max(1, shifts - 1))}
        >
          -
        </button>
        <input
          type="text"
          className="form-control text-center"
          readOnly
          value={shifts}
        />
        <button
          className="btn btn-outline-secondary"
          onClick={() => setShifts(Math.min(2, shifts + 1))}
        >
          +
        </button>
      </div>
    </div>

        <div className="text-muted small mb-4">
            Daily Working Hours - {totalDuration}:00
        </div>
        <ShiftSelector
            shiftNumber={1}
            shift={firstShift}
            setShift={setFirstShift}
            maxHours={totalDuration}
            isSingleShift={shifts === 1}
          />

          {shifts === 2 && (
            <ShiftSelector
              shiftNumber={2}
              shift={secondShift}
              setShift={setSecondShift}
              maxHours={Math.max(1, totalDuration - parseInt(firstShift.duration))}
              readOnly={true}
              previousShiftEnd={firstShift.startTime}
            />
          )}

<div class="d-flex flex-column gap-2 text-sm text-gray-600">
  
  <div class="alert alert-warning bg-warning bg-opacity-10 d-flex align-items-center">
    <i class="bi bi-exclamation-circle me-2"></i>
    <span>Surge pricing between 7:00 - 7:30 am/pm</span>
  </div>

  
  <div class="alert alert-info bg-info bg-opacity-10 d-flex align-items-center">
    <i class="bi bi-info-circle me-2"></i>
    <span>Special discounts between 12:00 PM to 4:00 PM</span>
  </div>
</div>


      </div>
      </div>

      <div className="col-md-6">
      {/* <div className='card p-2'> */}
        <Calendar
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/* </div> */}
      </div>

      <NotesInput notes={notes} setNotes={setNotes} />

      <Submit price={price} duration={totalDuration} handlefunc={handleSubmit}/>

    </div>
    </div>
  );
};

export default WorkShiftsSelector;
