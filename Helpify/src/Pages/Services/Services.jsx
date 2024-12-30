import React,{useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import ServiceHeroSection from '../../Components/HeroSection/ServiceHeroSection';
import ServiceCarousel from '../../Components/ServiceCarousel/ServiceCarousel';
import TestimonialSection from '../../Components/TestimonialSection/TestimonialSection';
import ServiceTimeline from '../../Components/ServiceTimeline/ServiceTimeline';
import Booking from '../../Components/Booking';


const Services = () => {
  const { serviceType } = useParams();
  const [currentService, setCurrentService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [service,setService]=useState({});



  const fetchservicedetails = async () =>{
    const resp = await fetch(`http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/servicedata/${serviceType}`);
    const details = await resp.json();
    console.log(details[0]);
    if(resp.ok && resp.status === 200){
         setService(details[0]);
    }
    else{
      console.log("Not fetched properly")
    }

  }
useEffect(()=>{
  fetchservicedetails();
},[serviceType]);



  useEffect(() => {
    const fetchServices = async () => {
      try {
        const url = `http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/services/${serviceType}`;

        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        
        const data = await response.json();

        if (serviceType) {
          setCurrentService(data);
        }
        
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
  
    fetchServices();
  }, [serviceType]);

  return (
    <div className="services-page">
   
      {currentService && (
        <ServiceHeroSection key={currentService.id} service={currentService} />
      )}
      <ServiceCarousel/>
      <TestimonialSection/>
      <Booking  service ={service}/>
      <ServiceTimeline/>
    </div>
  );
};

export default Services;