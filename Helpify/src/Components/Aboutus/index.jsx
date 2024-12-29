import React, { useState , useEffect } from 'react';
import { LinkedinIcon, HomeIcon, Heart, Users, Target } from 'lucide-react';
const AboutUs = () => {
  const [selectedCategory, setSelectedCategory] = useState('Founders');
  
  const [teamMembers , setteammember] = useState([]);
  useEffect(()=>{
    fetchteammemberdetails()
  },[]);

  const fetchteammemberdetails = async()=>{
    try {
      const response = await fetch("http://localhost:8084/teammember");
      const data = await response.json();
      setteammember(data);
    } catch (error) {
      console.error("Error fetching Team Member data:", error);

    }
  }
  const teamCategories = [
    'Founders',
    'Advisors',
    'Operations',
    'Customer Success',
    'Technical Team',
  ];
  
  



  const styles = {
    gradientBg: {
      background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)'
    },
    secondaryGradient: {
      background: 'linear-gradient(135deg, #80d0c7 0%, #65a5ff 100%)'
    },
    iconBg1: {
      backgroundColor: '#66a6ff'
    },
    iconBg2: {
      backgroundColor: '#80d0c7'
    },
    iconBg3: {
      backgroundColor: '#89f7fe'
    },
    cardHover: {
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'translateY(-5px)'
      }
    }
  };

  return (
    <div className="min-vh-100" style={{backgroundColor: '#f8fdff'}}>
      {/* Hero Section */}
      <div className="text-white py-5 position-relative" style={styles.gradientBg}>
        <div className="container text-center position-relative z-1 py-5">
          <h1 className="display-4 fw-bold mb-4 text-white">
            Welcome to MadadMitra
          </h1>
          <p className="lead mb-4 text-white">
            Your Trusted Partner in Home Services
          </p>
          <blockquote className="display-6 fst-italic mb-4 text-white">
            "हर घर की सेवा, हर परिवार की ख़ुशी"
            <br />
            <small className="text-white fs-6 fw-normal">
              - Serving every home, bringing joy to every family
            </small>
          </blockquote>
        </div>
        {/* Wave SVG */}
        <div className="position-absolute bottom-0 start-0 w-100">
          <svg viewBox="0 0 1440 200" xmlns="http://www.w3.org/2000/svg">
            <path 
              fill="#f8fdff" 
              fillOpacity="1" 
              d="M0,32L48,37.3C96,43,192,53,288,80C384,107,480,149,576,154.7C672,160,768,128,864,112C960,96,1056,96,1152,90.7C1248,85,1344,75,1392,69.3L1440,64L1440,200L1392,200C1344,200,1248,200,1152,200C1056,200,960,200,864,200C768,200,672,200,576,200C480,200,384,200,288,200C192,200,96,200,48,200L0,200Z"
            />
          </svg>
        </div>
      </div>

      {/* Values Section */}
      <div className="container py-5">
        <div className="row g-4">
          {/* Quality Service Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 text-center p-4 hover-shadow">
              <div className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{...styles.iconBg1, width: '64px', height: '64px'}}>
                <HomeIcon className="text-white" size={24} />
              </div>
              <h3 className="h4 mb-3" style={{color: '#66a6ff'}}>Quality Service</h3>
              <p className="text-muted">
                Delivering excellence in every visit to your home
              </p>
            </div>
          </div>
          
          {/* Trust & Safety Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 text-center p-4 hover-shadow">
              <div className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{...styles.iconBg2, width: '64px', height: '64px'}}>
                <Heart className="text-white" size={24} />
              </div>
              <h3 className="h4 mb-3" style={{color: '#80d0c7'}}>Trust & Safety</h3>
              <p className="text-muted">
                Verified professionals you can trust with your home
              </p>
            </div>
          </div>
          
          {/* Community First Card */}
          <div className="col-md-4">
            <div className="card h-100 shadow border-0 text-center p-4 hover-shadow">
              <div className="mx-auto mb-4 rounded-circle d-flex align-items-center justify-content-center" style={{...styles.iconBg3, width: '64px', height: '64px'}}>
                <Users className="text-white" size={24} />
              </div>
              <h3 className="h4 mb-3" style={{color: '#65a5ff'}}>Community First</h3>
              <p className="text-muted">
                Building better lives for service providers
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="text-white py-5 my-5" style={styles.secondaryGradient}>
        <div className="container text-center">
          <div className="d-flex align-items-center justify-content-center mb-4">
            <Target size={48} className="me-3 text-white" />
            <h2 className="display-5 mb-0 text-white">Our Mission</h2>
          </div>
          <p className="lead mx-auto text-white" style={{maxWidth: '800px'}}>
            To revolutionize the domestic service industry by creating a seamless 
            connection between quality service providers and households, ensuring 
            dignity, trust, and excellence in every interaction.
          </p>
        </div>
      </div>

      {/* Team Section */}
      <div className="container py-5">
        <h2 className="display-5 text-center mb-5" style={{color: '#66a6ff'}}>Meet Our Team</h2>
        
        {/* Team Categories */}
        <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
          {teamCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`btn ${
                selectedCategory === category
                  ? 'text-white'
                  : 'btn-outline-primary'
              } rounded-pill px-4`}
              style={selectedCategory === category ? styles.gradientBg : {}}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="row g-4">
          {teamMembers[selectedCategory]?.map(member => (
            <div key={member.id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="p-4" style={styles.gradientBg}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-circle mx-auto d-block border border-4 border-white"
                    style={{width: '128px', height: '128px', objectFit: 'cover'}}
                  />
                </div>
                <div className="card-body text-center">
                  <h3 className="h4 mb-2" style={{color: '#66a6ff'}}>{member.name}</h3>
                  <p className="fw-medium mb-3" style={{color: '#80d0c7'}}>{member.role}</p>
                  <p className="text-muted mb-4">{member.description}</p>
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn text-white rounded-pill d-inline-flex align-items-center"
                    style={styles.gradientBg}
                  >
                    <LinkedinIcon size={20} className="me-2" />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        .hover-shadow {
          transition: all 0.3s ease;
        }
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0,0,0,.1)!important;
        }
        .btn-outline-primary {
          border-color: #66a6ff;
          color: #66a6ff;
        }
        .btn-outline-primary:hover {
          background-color: #66a6ff;
          border-color: #66a6ff;
          color: white;
        }
      `}</style>
    </div>
  );
};


export default AboutUs;