import React, { useRef, useState, useEffect } from 'react';
import './AuthForm.css';

const AuthForm = ({ isOpen, onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailureAlert, setShowFailureAlert] = useState(false);
  const [signInSuccess, setSignInSuccess] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (signInSuccess) {
      fetchUserDetails();
    }
  }, [signInSuccess]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };


  // Check if user is logged in
  const isUserLoggedIn = () => {
    let loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
    return loggedInUserEmail ? true : false;
  };

  // Logout functionality
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("userDetails");
    window.location.reload();
  };

  // Sign in handler
  const signInHandler = async (event) => {
    event.preventDefault();
    var formValuesObject = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (formValuesObject.email && formValuesObject.password) {
      try {
        const signInResponse = await fetch("http://localhost:8084/user/signin", {
          method: "POST",
          body: JSON.stringify(formValuesObject),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (signInResponse.ok && signInResponse.status === 200) {
          const signInResponseData = await signInResponse.json();
          localStorage.setItem("authToken", signInResponseData?.token);
          localStorage.setItem("loggedInUserEmail", formValuesObject.email);
          setSignInSuccess(true);
          setShowSuccessAlert(true);
          setShowFailureAlert(false);
        } else {
          setShowSuccessAlert(false);
          setShowFailureAlert(true);
        }
      } catch (error) {
        console.error("Sign in error:", error);
        setShowSuccessAlert(false);
        setShowFailureAlert(true);
      }
    } else {
      setShowFailureAlert(true);
    }
  };

  // Fetch user details

  const fetchUserDetails = async () => {
    let email = localStorage.getItem("loggedInUserEmail");
    try {
      const productsResponse = await fetch(`http://localhost:8084/user/${email}`, {
        headers: {
          Authorization: localStorage.getItem("authToken"),
        },
      });
      const userDetails = await productsResponse.json();
      
      if (productsResponse.ok && productsResponse.status === 200) {
       
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        window.location.reload();
      } else {
        setShowFailureAlert(true);
      }
    } catch (error) {
      console.error("Fetch user details error:", error);
      setShowFailureAlert(true);
    }
  };

  // Sign up handler
  const signUpHandler = async (event) => {
    event.preventDefault();
    var formValuesObject = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    if (
      formValuesObject.firstName &&
      formValuesObject.lastName &&
      formValuesObject.email &&
      formValuesObject.password
    ) {
      try {
        const response = await fetch("http://localhost:8084/user", {
          method: "POST",
          body: JSON.stringify(formValuesObject),
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (response.ok && (response.status === 201 || response.status === 200)) {
          setShowFailureAlert(false);
          setShowSuccessAlert(true);
          // Automatically switch to sign in after successful registration
          setTimeout(() => {
            setIsSignUp(false);
            setShowSuccessAlert(false);
          }, 2000);
        } else {
          setShowSuccessAlert(false);
          setShowFailureAlert(true);
        }
      } catch (error) {
        console.error("Sign up error:", error);
        setShowSuccessAlert(false);
        setShowFailureAlert(true);
      }
    } else {
      setShowFailureAlert(true);
    }
  };



  // If user is already logged in, show logout button
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isAnimating ? 'show' : ''}`}>
      <div className="" onClick={handleClose}></div>
      
      <div className={`modal-container ${isAnimating ? 'show' : ''}`} ref={modalRef}>
        <div className="auth-modal">
          <button className="close-button" onClick={handleClose}>
            <i className="fas fa-times"></i>
          </button>

          <div className="modal-content">
            {/* Header */}
            <div className="text-center mb-4">
              <div className="user-icon">
                <i className="fas fa-user"></i>
              </div>
              <h2 className="modal-title">
                {isSignUp ? 'Create Account' : 'Welcome Back'}
              </h2>
              <p className="modal-subtitle">
                {isSignUp 
                  ? 'Start your journey with us today' 
                  : 'Sign in to continue your journey'}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={isSignUp ? signUpHandler : signInHandler}>
              {isSignUp && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        ref={firstNameRef}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control custom-input"
                        ref={lastNameRef}
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group mb-3">
                <label>Email Address</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-envelope"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control custom-input"
                    ref={emailRef}
                    required
                  />
                </div>
              </div>

              <div className="form-group mb-4">
                <label>Password</label>
                <div className="input-group">
                  <span className="input-group-text">
                    <i className="fas fa-lock"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control custom-input"
                    ref={passwordRef}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>

              {showSuccessAlert && (
                <div className="alert alert-success d-flex align-items-center">
                  <div className="alert-dot"></div>
                  <div>
                    {isSignUp ? 'Account created successfully!' : 'Signed in successfully!'}
                  </div>
                </div>
              )}

              {showFailureAlert && (
                <div className="alert alert-danger d-flex align-items-center">
                  <div className="alert-dot"></div>
                  <div>
                    {isSignUp 
                      ? 'Failed to create account. Please check your details.' 
                      : 'Failed to sign in. Please check your credentials.'}
                  </div>
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100 custom-button">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </button>

              <div className="text-center mt-4">
                <p className="toggle-text">
                  {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                  <button
                    type="button"
                    className="btn btn-link toggle-button"
                    onClick={() => {
                      setIsSignUp(!isSignUp);
                      setShowSuccessAlert(false);
                      setShowFailureAlert(false);
                    }}
                  >
                    {isSignUp ? 'Sign In' : 'Sign Up'}
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;