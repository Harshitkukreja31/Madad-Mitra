import React, { useState, useCallback, useRef } from 'react';
import HiringConfirmation from './Confirmation/HiringConfirmation';
import './HiringForm.css';

const WorkerRegistration = () => {
  // Centralized state management with phase control
  const [phase, setPhase] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Refs for input fields to manage references directly
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneNumberRef = useRef(null);
  const addressRef = useRef(null);
  const genderRef = useRef(null);
  const otpRef = useRef(null);
  const serviceTypeRef = useRef(null);
  const numberOfShiftsRef = useRef(null);
  const shiftTimingsRef = useRef(null);
  const pastExperienceRef = useRef(null);

  // State for each registration phase
  const [personalData, setPersonalData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    gender: '',
    profileImage: null
  });

  const [otpData, setOtpData] = useState({
    otp: '',
    phonenumber: ''
  });

  const [hiringData, setHiringData] = useState({
    serviceType: '',
    numberOfShifts: '',
    shiftTimings: '',
    pastExperience: ''
  });

  const submitPersonalInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Validation using refs
      const firstName = firstNameRef.current.value.trim();
      const lastName = lastNameRef.current.value.trim();
      const email = emailRef.current.value.trim();
      const phoneNumber = phoneNumberRef.current.value.trim();
      const address = addressRef.current.value.trim();
      const gender = genderRef.current.value;

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[0-9]{10}$/;

      if (!firstName) throw new Error('First Name is required');
      if (!lastName) throw new Error('Last Name is required');
      if (!emailRegex.test(email)) throw new Error('Invalid email format');
      if (!phoneRegex.test(phoneNumber)) throw new Error('Phone number must be 10 digits');
      if (!address) throw new Error('Address is required');
      if (!gender) throw new Error('Please select a gender');

      // Update personal data state
      setPersonalData({
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        gender
      });
      localStorage.setItem('phoneNumber', phoneNumber);

      // Fetch API call to submit personal information
      const response = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/newworkers/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          gender
        })
      });
      
      if (response.status === 201) {
        // Generate OTP after successful personal info submission
        const otpResponse = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/newworkers/send-otp', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            phonenumber: phoneNumber 
          })
        });
        
        const otpData = await otpResponse.json();
        if (otpData.status === "success") {
          setOtpData(prev => ({
            ...prev, 
            phonenumber: phoneNumber
          }));
          setPhase('otp');
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Submission failed');
      }
    } catch (error) {
      setError(error.message || 'Submission failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // OTP Verification Handler
  const verifyOtp = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const otp = otpRef.current.value;

      // Validate OTP length
      if (otp.length !== 6) {
        throw new Error('OTP must be 6 digits');
      }

      const response = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/newworkers/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phonenumber: otpData.phonenumber,
          code: otp
        })
      });
      
      const responseData = await response.json();
      if (responseData.status === "success") {
        setPhase('hiring');
      } else {
        throw new Error(responseData.message || 'OTP verification failed');
      }
    } catch (error) {
      setError(error.message || 'OTP verification failed');
    } finally {
      setIsLoading(false);
    }
  }, [otpData]);

  // Hiring Information Submission Handler
  const submitHiringInfo = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // Validation using refs
      const serviceType = serviceTypeRef.current.value;
      const numberOfShifts = numberOfShiftsRef.current.value;
      const shiftTimings = shiftTimingsRef.current.value.trim();
      const pastExperience = pastExperienceRef.current.value.trim();
      const phoneNumber = localStorage.getItem('phoneNumber');

      // Enhanced Validations
      if (!serviceType) throw new Error('Please select a service type');
      
      if (!numberOfShifts || 
          isNaN(parseInt(numberOfShifts)) || 
          parseInt(numberOfShifts) < 1) {
        throw new Error('Please enter a valid number of shifts');
      }
      
      if (!shiftTimings) throw new Error('Shift timings are required');
      
      const phoneRegex = /^[0-9]{10}$/; 
      if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
        throw new Error('Please enter a valid 10-digit phone number');
      }

      const completeApplicationData = {
        serviceType,
        numberOfShifts: parseInt(numberOfShifts),
        shiftTimings,
        pastExperience,
        phoneNumber
      };

      const response = await fetch('http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/hiring/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(completeApplicationData)
      });
     
      const responseData = await response.json();
      if (responseData.success) {
        alert('Application submitted successfully!');
        setPhase('Confirmation');
      } else {
        throw new Error(responseData.message || 'Application submission failed');
      }
    } catch (error) {
      if (error.message) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);
  // Personal Information Form Component
  const PersonalInfoForm = () => (
    <div className="registration-phase">
      <h2>Personal Information</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-grid">
        <input 
          ref={firstNameRef}
          type="text" 
          placeholder="First Name" 
          required 
        />
        <input 
          ref={lastNameRef}
          type="text" 
          placeholder="Last Name" 
          required 
        />
        <input 
          ref={emailRef}
          type="email" 
          placeholder="Email" 
          required 
        />
        <input 
          ref={phoneNumberRef}
          type="tel" 
          placeholder="Phone Number" 
          maxLength="10"
          required 
        />
        <textarea 
          ref={addressRef}
          placeholder="Address" 
          required 
        />
        <select 
          ref={genderRef}
          required
        >
          <option value="">Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <button 
        onClick={submitPersonalInfo} 
        disabled={isLoading}
        className="submit-btn"
      >
        {isLoading ? 'Submitting...' : 'Next'}
      </button>
    </div>
  );

  // OTP Verification Form Component
  const OtpVerificationForm = () => (
    <div className="registration-phase">
      <h2>OTP Verification</h2>
      {error && <div className="error-message">{error}</div>}
      
      <input 
        ref={otpRef}
        type="text" 
        placeholder="Enter 6-digit OTP" 
        required 
        maxLength="6"
        pattern="\d{6}"
      />
      
      <button 
        onClick={verifyOtp} 
        disabled={isLoading}
        className="submit-btn"
      >
        {isLoading ? 'Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );

  // Hiring Information Form Component
  const HiringForm = () => (
    <div className="registration-phase">
      <h2>Service Details</h2>
      {error && <div className="error-message">{error}</div>}
      
      <div className="form-grid">
        <select 
          ref={serviceTypeRef}
          required
        >
          <option value="">Select Service Type</option>
          <option value="housekeeping">Housekeeping</option>
          <option value="cooking">Cooking</option>
          <option value="childcare">Childcare</option>
          <option value="eldercare">Eldercare</option>
        </select>
        
        <input 
          ref={numberOfShiftsRef}
          type="number" 
          placeholder="Number of Shifts" 
          required 
          min="1"
        />
        
        <input 
          ref={shiftTimingsRef}
          type="text" 
          placeholder="Shift Timings" 
          required 
        />
        
        <textarea 
          ref={pastExperienceRef}
          placeholder="Past Experience (Optional)" 
        />
      </div>
      
      <button 
        onClick={submitHiringInfo} 
        disabled={isLoading}
        className="submit-btn"
      >
        {isLoading ? 'Submitting...' : 'Submit Application'}
      </button>
    </div>
  );

  // Render appropriate phase based on current state
  return (
    <div className="registration-container">
      {phase === 'personal' && <PersonalInfoForm />}
      {phase === 'otp' && <OtpVerificationForm />}
      {phase === 'hiring' && <HiringForm />}
      {phase==='confirmation' && <HiringConfirmation/>}

    </div>
  );
};

export default WorkerRegistration;