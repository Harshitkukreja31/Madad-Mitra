import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Globe, ArrowRight, CheckCircle, Languages } from 'lucide-react';
import workerform from "../../assets/images/workerform.jpg"



const HiringSection = () => {
  const [language, setLanguage] = useState('en');
  const navigate = useNavigate();

  const content = {
    en: {
      title: "Empower Your Career in Domestic Work",
      subtitle: "Professional Opportunities Await",
      description: "Transform your skills into a meaningful career. Join a platform that values your work, ensures fair treatment, and opens doors to better employment.",
      features: [
        "Trusted Job Matches",
        "Skill Enhancement",
        "Fair Compensation",
        "Safety First"
      ],
      ctaButton: "Start Your Journey"
    },
    hi: {
      title: "घरेलू कार्य में अपना करियर बनाएं",
      subtitle: "पेशेवर अवसर आपका इंतजार कर रहे हैं",
      description: "अपने कौशल को अर्थपूर्ण करियर में बदलें। एक ऐसे मंच से जुड़ें जो आपके काम का सम्मान करता है, उचित व्यवहार सुनिश्चित करता है और बेहतर रोजगार के द्वार खोलता है।",
      features: [
        "विश्वसनीय नौकरी मिलान",
        "कौशल विकास",
        "उचित वेतन",
        "सुरक्षा प्राथमिकता"
      ],
      ctaButton: "अपनी यात्रा शुरू करें"
    }
  };

  return (
    <div className="min-vh-80 bg-light position-relative">
      {/* Language Toggle - Confined to Section */}
      <div className="position-relative">
        <button
          onClick={() => setLanguage(prev => prev === 'en' ? 'hi' : 'en')}
          className="btn btn-light rounded-circle shadow position-absolute top-0 end-0 m-3"
        >
          {language === 'en' ? 
            <Globe size={24} className="text-primary" /> : 
            <Languages size={24} className="text-primary" />
          }
        </button>
      </div>

      <div className="container py-5">
        <div className="row align-items-center g-5">
          {/* Content Section */}
          <div className="col-lg-6">
            <h2 className="text-uppercase text-primary fw-semibold mb-3">{content[language].subtitle}</h2>
            <h1 className="display-4 fw-bold text-dark mb-4">{content[language].title}</h1>
            <p className="lead text-muted mb-4">{content[language].description}</p>

            {/* Features Grid */}
            <div className="row row-cols-1 row-cols-sm-2 g-3">
              {content[language].features.map((feature, index) => (
                <div key={index} className="col">
                  <div className="card shadow-sm border-0 rounded-3 p-3 h-100">
                    <div className="d-flex align-items-center">
                      <CheckCircle size={20} className="text-primary me-3" />
                      <span className="text-muted fw-medium">{feature}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => navigate('/gethired')}
              className="btn btn-primary btn-lg mt-4 d-flex align-items-center"
            >
              {content[language].ctaButton}
              <ArrowRight size={20} className="ms-2" />
            </button>
          </div>

          {/* Enhanced Image Section */}
          <div className="col-lg-6 position-relative">
            <div className="position-relative overflow-hidden rounded-3 shadow">
              {/* Decorative Elements */}
              <div className="position-absolute bg-primary opacity-25 rounded-circle" style={{ width: '150px', height: '150px', top: '-50px', left: '-50px' }}></div>
              <div className="position-absolute bg-primary opacity-25 rounded-circle" style={{ width: '200px', height: '200px', bottom: '-75px', right: '-75px' }}></div>

              {/* Main Image */}
              <img
                src={workerform}
                alt="Domestic Workers"
                className="w-100 rounded-3"
                style={{ objectFit: 'cover' }}
              />
              {/* Overlay Effects */}
              <div className="position-absolute w-100 h-100 top-0 start-0 bg-gradient" style={{ background: 'linear-gradient(to top, rgba(0, 0, 0, 0.1), transparent)' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HiringSection;
