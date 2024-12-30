import React, { useState, useEffect } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import logo from "../../assets/Logo.png"
import './Navbar.css';
import AuthForm from '../Login/AuthForm.jsx';

const Navbar = () => {
  const navigate = useNavigate();

  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSignin, setSignin] = useState(false);

  // Check token validity and expiration
  const checkTokenValidity = () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setSignin(false);
      return;
    }

    try {
      // Decode the JWT token
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        // Token has expired, clear storage and update state
        localStorage.removeItem('authToken');
        localStorage.removeItem('loggedInUserEmail');
        localStorage.removeItem('userDetails');
        setSignin(false);
        navigate('/');
      } else {
        setSignin(true);
      }
    } catch (error) {
      console.error('Error checking token:', error);
      setSignin(false);
    }
  };

  // Check token validity on mount and set up interval
  useEffect(() => {
    checkTokenValidity();

    // Check token validity every minute
    const intervalId = setInterval(checkTokenValidity, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Verify user data with backend
  useEffect(() => {
    const verifyUserData = async () => {
      if (!isSignin) return;

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch("http://localhost:8084/user/userData", {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          setSignin(false);
          localStorage.removeItem('authToken');
          localStorage.removeItem('loggedInUserEmail');
          localStorage.removeItem('userDetails');
          navigate('/');
        }
      } catch (err) {
        console.error('Error verifying user data:', err);
        setSignin(false);
      }
    };

    verifyUserData();
  }, [isSignin]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setIsNavCollapsed(true);
        setIsDropdownOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (!isNavCollapsed && window.innerWidth < 992) || isAuthModalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isNavCollapsed, isAuthModalOpen]);

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('loggedInUserEmail');
    localStorage.removeItem('userDetails');
    setSignin(false);
    navigate('/');
  };

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span><img src={logo}></img></span>
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={() => setIsNavCollapsed(!isNavCollapsed)}
          >
            <i className={`bi ${isNavCollapsed ? 'bi-list' : 'bi-x-lg'}`}></i>
          </button>
          <div
            className={`collapse navbar-collapse ${!isNavCollapsed ? 'show' : ''}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {['Home', 'About Us', 'Get Hired','Contact Us'].map((item) => (
                <li className="nav-item" key={item}>
                  <Link
                    className="nav-link px-3"
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replaceAll(' ', '')}`}
                    onClick={() => setIsNavCollapsed(true)}
                  >
                    {item}
                  </Link>
                </li>
              ))}
              {isSignin && (
                    <li className="nav-item"  key="Profile">
                      <Link
                        className="nav-link px-3"
                        to="/profile"
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsNavCollapsed(true);
                        }}
                      >
                        Profile
                      </Link>
                    </li>
                  )}
              <li className="nav-item dropdown">
                <a
                  className={`nav-link dropdown-toggle px-3 ${isDropdownOpen ? 'show' : ''}`}
                  href="#"
                  role="button"
                  onClick={toggleDropdown}
                  aria-expanded={isDropdownOpen}
                >
                  Services
                </a>
                <ul className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? 'show' : ''}`}>
                  {['All-rounders', 'Cooking Maid', 'Baby Caretaker', 'House Maid', '24Hrs-Live in', '24-Hrs-Japa'].map((item) => (
                    <li key={item}>
                      <Link
                        className="dropdown-item"
                        to={`/services/${item.toLowerCase().replaceAll(' ', '-')}`}
                        onClick={() => {
                          setIsDropdownOpen(false);
                          setIsNavCollapsed(true);
                        }}
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                  
                </ul>
              </li>
              <li>
                {!isSignin ? (
                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    className="nav-sign-in"
                  >
                    Sign In
                  </button>
                ) : (
                  <button className="nav-sign-in" onClick={handleLogout}>
                    Sign Out
                  </button>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {!isNavCollapsed && window.innerWidth < 992 && (
        <div
          className="mobile-overlay"
          onClick={() => setIsNavCollapsed(true)}
        />
      )}
      
      <AuthForm
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
};

export default Navbar;