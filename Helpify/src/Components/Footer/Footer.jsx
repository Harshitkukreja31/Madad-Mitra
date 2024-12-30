// Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container py-5">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-lg-3 col-md-6">
            <h3 className="footer-title mb-4">MADAD-MITRA</h3>
            <p className="footer-description">
              Your trusted partner in finding reliable domestic help. We connect households 
              with verified and skilled domestic workers across India.
            </p>
            <div className="social-links mt-4">
              <a href="#" className="me-3"><i className="bi bi-facebook"></i></a>
              <a href="#" className="me-3"><i className="bi bi-twitter"></i></a>
              <a href="#" className="me-3"><i className="bi bi-instagram"></i></a>
              <a href="#" className="me-3"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-subtitle mb-4">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/gethired">Get Hired</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/terms">Terms & Conditions</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-subtitle mb-4">Our Services</h5>
            <ul className="footer-links">
              <li><Link to="/services/all-rounders">All-rounders</Link></li>
              <li><Link to="/services/cooking-maid">Cooking Maid</Link></li>
              <li><Link to="/services/baby-caretaker">Baby Caretaker</Link></li>
              <li><Link to="/services/house-maid">House Maid</Link></li>
              <li><Link to="/services/24hrs-live-in">24Hrs-Live in</Link></li>
              <li><Link to="/services/24hrs-japa">24-Hrs-Japa</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <h5 className="footer-subtitle mb-4">Contact Us</h5>
            <ul className="footer-links contact-info">
              <li>
                <i className="bi bi-geo-alt-fill me-2"></i>
                123 Main Street, City, State, India
              </li>
              <li>
                <i className="bi bi-telephone-fill me-2"></i>
                +91 98765 43210
              </li>
              <li>
                <i className="bi bi-envelope-fill me-2"></i>
                info@madad-mitra.com
              </li>
              <li>
                <i className="bi bi-clock-fill me-2"></i>
                Mon - Sat: 9:00 AM - 6:00 PM
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom py-3">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center text-md-start">
              <p className="mb-0">
                &copy; {currentYear} MADAD-MITRA. All rights reserved.
              </p>
            </div>
            <div className="col-md-6 text-center text-md-end">
              <p className="mb-0">
                Made with <i className="bi bi-heart-fill text-danger mx-1"></i> in India
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;