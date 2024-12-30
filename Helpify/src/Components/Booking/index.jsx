import React from 'react'
import { useState, useEffect } from 'react'
import CitySelector from '../SelectCity/index.jsx'
import ServiceTypeCard from '../Service_Type/index.jsx'
import QuestionForm from '../Service_Type_Question/index.jsx'
import GenderSelector from '../Gender_Selector/index.jsx'
import Header from '../HeaderService/index.jsx'
import DateTime from '../Date_Time_Selector/index.jsx';
import Details from '../Details/index.jsx'
import Subscription from '../Subscription/index.jsx';
const Booking = ({service}) => {
    const [cityData, setCityData] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedQues , setSelectedQues] = useState(null);
    const [selectedDate , setSelectedDate] = useState(null);
    const [formData, setFormData] = useState({});
    const [gender, setGender] = useState('female');
    const [price , setprice] = useState(0);
    const [dateData, setDateData] = useState({});
    const [showSubscription , setSubscription] = useState(false);
    const [subScriptiondata , setSubscriptiondata] = useState(null);
    const [showheader , setshowheader] = useState(true);
    useEffect(() => {
        console.log("Service received is ",service);
        fetchCityData();
    }, []);

    useEffect(()=>{
      setFormData({
        city: selectedCity,
        service: selectedType,
        gender: gender, 
    });
    },[selectedType]);

    useEffect(() => {
        console.log(formData);
        console.log(dateData);
    }, [selectedDate]);



    const fetchCityData = async () => {
        try {
        const response = await fetch('http://localhost:8084/city');
        const data = await response.json();
        setCityData(data);
        } catch (error) {
        console.error('Error fetching city data:', error);
        }
    };
    const handleBack = () => {
      if(showSubscription){
        setSubscription(null);
        setSelectedDate(null);
        subScriptiondata(null);
      }
      else if(selectedDate){
        if(subScriptiondata){
          setSubscription(true);
        }
        else{
          setSelectedDate(null);
        }        
      }
      else if(selectedQues){
        setSelectedQues(null);
      }
      else if (selectedType) {
        setSelectedType(null);
        setFormData({});
      } else if (selectedCity) {
        setSelectedCity(null);
      }

    }; 
      
    const getHeaderTitle = () => {
      if (!selectedCity) return 'Select your city';
      if (!selectedType) return 'Select a Service';
      if(!selectedQues) return 'Service Details';
      if(!selectedDate) return 'Work Shift and Date';
      if(!showSubscription) return 'Booking Details'
      return 'Subscription Plan';
    };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      <div className="container py-4">
        {showheader && <Header 
          title={getHeaderTitle()} 
          showBack={selectedCity || selectedType}
          onBack={handleBack}
        />}

        {!selectedCity && (
          <CitySelector 
            cities={cityData}
            onCitySelect={setSelectedCity} 
          />
        )}

        {selectedCity && !selectedType && (
          <>
            <GenderSelector 
              selectedGender={gender} 
              onGenderSelect={setGender} 
            />
            <div className="row">
            {service.types.map((type) => (
                <div key={type.id} className="col-12 col-md-6 mb-3">
                  <div className="card rounded-4 border-0 shadow-sm h-100">
                <ServiceTypeCard
                    type={type}
                    onSelect={setSelectedType}
                    setprice={setprice}
                />
                </div>
              </div>
            ))}
            </div>
          </>
        )}

        
      {selectedType && !selectedQues &&(
        <>
          <QuestionForm
            questions={selectedType.questions}
            setFormData={setFormData}
            setprice={setprice}
            setSelectedQues={setSelectedQues}
            price={price}
            duration = {selectedType.duration}
          />
        </>
      )}

      {
        selectedQues && !selectedDate && (<DateTime totalDuration ={selectedType.duration} setDateData ={setDateData} onDateSelect={setSelectedDate} setSubscription={setSubscription} price={price}/>)
      }
      
      {
         selectedDate && showSubscription  && (<Subscription setSubscription={setSubscription} setSubscriptiondata={setSubscriptiondata}/>)
      }
      {
         selectedDate && !showSubscription && (<Details formData={formData} dateData={dateData} subScriptiondata={subScriptiondata} price={price} setshowheader = {setshowheader}/>)
      }

      </div>
    </div>
  )
}

export default Booking