import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import AuthForm from '../Login/AuthForm.jsx';
import { isUserLoggedIn, logout } from "../../utils/helpers.js"


const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
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

  return (
    <>
      <nav className={`navbar navbar-expand-lg ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <span>MADAD-MITRA</span>
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
              {['Home', 'About', 'Get Hired', 'Profile'].map((item) => (
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
                {!isUserLoggedIn() ?(<button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="nav-sign-in"
                >
                  Sign In
                </button>):
                (
                  <button className="nav-sign-in" onClick={logout}>
                    Signout
                  </button>
                )
                }
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