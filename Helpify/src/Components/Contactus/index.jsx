import React, { useState } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Heart } from 'lucide-react';

const ContactUs = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <div className="min-vh-100 bg-light py-5">
      <div className="container">
        <div className="row g-4 align-items-center">
          {/* Left Side - Contact Form */}
          <div className="col-md-6">
            <div className="bg-white p-4 rounded-3 shadow-sm">
              <h2 className="mb-4 fw-bold">Fill the form to contact us quicker!</h2>
              
              <form>
                <div className="mb-3">
                  <label className="form-label">Full name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter your Name"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Phone Number</label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <img 
                        src="https://flagcdn.com/w20/in.png" 
                        alt="India flag" 
                        className="me-1" 
                        style={{width: '20px'}}
                      />
                    </span>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="form-label">Email ID</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Enter your Email"
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary px-4 py-2"
                  style={{backgroundColor: '#89f7fe', borderColor: '#89f7fe'}}
                >
                  Continue
                </button>
              </form>

              {/* Social Media Links */}
              <div className="mt-5">
                <div className="d-flex gap-3">
                  <a href="#" className="btn btn-light rounded-circle p-2">
                  <i class="fa-brands fa-linkedin fa-2x"></i>
                  </a>
                  <a href="#" className="btn btn-light rounded-circle p-2">
                  <i class="fa-brands fa-twitter fa-2x"></i>
                  </a>
                  <a href="#" className="btn btn-light rounded-circle p-2">
                  <i class="fa-brands fa-facebook fa-2x"></i>
                  </a>
                  <a href="#" className="btn btn-light rounded-circle p-2">
                   <i class="fa-brands fa-instagram fa-2x"></i>
                  </a>
                  <a href="#" className="btn btn-light rounded-circle p-2">
                  <i class="fa-brands fa-youtube fa-2x"></i>
                  </a>
                </div>
              </div>

              {/* Footer Links */}
              <div className="mt-4">
                <div className="d-flex gap-4 text-muted small">
                  <a href="#" className="text-decoration-none text-muted">Terms & Conditions</a>
                  <a href="#" className="text-decoration-none text-muted">Privacy Policy</a>
                  <a href="#" className="text-decoration-none text-muted">Refund Policy</a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Information */}
          <div className="col-md-6">
            <div className="ps-md-5">
              <div className="mb-5">
                <h3 className="fw-light mb-2">Hey we are here!</h3>
                <h2 className="display-5 fw-bold">Get in touch with us</h2>
              </div>

              <div className="d-flex flex-column gap-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-3">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-muted">Phone Number</div>
                    <div className="fw-bold">+91 8401-8401-42</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-3">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-muted">Headquarters</div>
                    <div className="fw-bold">586/6, Govindpuri, New Delhi, 110020</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-3">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-muted">E-mail ID</div>
                    <div className="fw-bold">support@madadmitra.com</div>
                  </div>
                </div>

                <div className="d-flex align-items-center gap-3">
                  <div className="bg-dark p-3 rounded-3">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="text-muted">WhatsApp</div>
                    <div className="fw-bold">+91 8401-8401-42</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Float Button */}
      <a 
        href="https://wa.me/918401840142" 
        className="position-fixed bottom-0 end-0 m-4 btn btn-success rounded-circle p-3"
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default ContactUs;