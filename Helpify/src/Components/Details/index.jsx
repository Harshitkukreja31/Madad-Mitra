import React from 'react'
import Address from '../Address/index.jsx';
import { Modal } from 'react-bootstrap';
import {useState,useEffect} from 'react';
import {OrderSuccess, OrderFailure} from './SucessFailure.jsx'
const index = ({ formData, dateData , subScriptiondata , price , setshowheader}) => {
    
  const[Amount , setTotalAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  useEffect(()=>{
    setTotalAmount(()=>{
       if(subScriptiondata){
         return price + 49 + subScriptiondata.planPrice;
       }
       else{
        return price + 49;
       }
    });
    
    fetchSavedAddresses(subScriptiondata);
  },[])

  const handleBookNow = () => {
    if (isTermsAccepted) {
      handlePayment();
    }
  };

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const fetchSavedAddresses = async()=>{
    try{
      const token = localStorage.getItem('authToken');
      const response = await fetch("http://localhost:8084/address",{
        headers:{
          'Authorization':token
        }
      })
        
      if(!response.ok){
        throw new Error('Failed to fetch addresses');
      }

      const addresses = await response.json();
      console.log(addresses);
      const defaultAddress = addresses.find(addr => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddress(defaultAddress);
      }
    }
    catch (error){
      console.log(error);
    }
  }

    // console.log(dateData);
    const { city, service, gender, requirements } = formData;
    const { Date: bookingDate, ShiftTime:ShiftTime1 , ShiftTime2 } = dateData;
    
    const [showAddressModal, setShowAddressModal] = useState(false);

    const handleOpenAddressModal = () => {
      setShowAddressModal(true);
    };
  
    const handleCloseAddressModal = () => {
      setShowAddressModal(false);
    };
  
    // Format requirements into a readable string
    const formatRequirements = () => {
      return Object.entries(requirements)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
    };
  
    // Format date to match the display format
    const formatDate = (date) => {
      return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
      });
    };
  
    // Format shift time range
    const formatShiftTime = (timeArray) => {
      return `${timeArray[0]} - ${timeArray[1]}`;
    };
    const handlesubscription = async()=>{
      try{
        const token = localStorage.getItem('authToken');
        const response = await fetch("http://localhost:8084/usersubscription", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            planName:subScriptiondata.planName
          })
        });

        if (!response.ok) {
          throw new Error('Failed to save address');
        }
        
        const data = await response.json();
        console.log(data);
      }
      catch(error){
        console.log(error);
      }
  };

  const handlebooking = async(payment_id , order_id)=>{
    try{
      const requestBody = {
        address: selectedAddress._id,
        service: service.name,
        requirement: requirements,
        ShiftTime1: ShiftTime1,
        Date: bookingDate,
        ...(ShiftTime2 && { ShiftTime2 }),
        razorpay_order_id:order_id,
        razorpay_payment_id:payment_id
      };
      const token = localStorage.getItem('authToken');
      const response = await fetch("http://localhost:8084/bookingdata", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Failed to save booking');
      }
      
      const data = await response.json();
      console.log(data);
    }
    catch(error){
      console.log(error);
    }
};

  

    const handlePayment = async () => {
      try {
          const response = await fetch('http://localhost:8084/create-order', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ amount: Amount, currency: 'INR' }) 
          });

          const { order } = await response.json();

          const options = {
              key: 'rzp_test_L7GqHOynrTGxn2',
              amount: order.amount,
              currency: order.currency,
              name: 'Madad Mitra',
              description: 'Test Transaction',
              order_id: order.id,
              handler: function (response) {
                  if(subScriptiondata){
                    handlesubscription();
                  }
                  handlebooking(response.razorpay_payment_id,response.razorpay_order_id);
                  setOrderStatus({
                    status: 'success',
                    details: {
                        orderId: response.razorpay_order_id,
                        paymentId: response.razorpay_payment_id,
                        amount: Amount
                    }
                });
                setshowheader(false);
              },
              prefill: {
                  name: 'John Doe',
                  email: 'johndoe@example.com',
                  contact: '9999999999',
              },
              theme: {
                  color: '#3399cc',
              },
              modal: {
                ondismiss: function() {
                    setOrderStatus({
                        status: 'failed',
                        error: 'Payment was cancelled. Please try again.'
                    });
                }
            }
          };
          const razorpay = new window.Razorpay(options);
          razorpay.open();
      } catch (error) {
          console.error('Payment error:', error);
          setOrderStatus({
            status: 'failed',
            error: 'Failed to initiate payment. Please try again.'
        });
        
      }
  };

    return (
      <div className="container py-4">
        <div className="card shadow-sm">
          {/* Header */}
        {!orderStatus && 
          <><div className="card-header bg-white border-bottom">
              <div className="d-flex align-items-center gap-2">
                <i className="bi bi-arrow-left fs-5 cursor-pointer"></i>
                <h2 className="mb-0 fs-4">Summary</h2>
              </div>
            </div><div className="card-body p-4">
                {/* Address Section */}
                <div className="d-flex justify-content-between align-items-start mb-4">
                  <div className="d-flex gap-2">
                    <i className="bi bi-geo-alt text-warning mt-1"></i>
                    <div>
                      <p className="text-muted mb-0">Address</p>
                      <p className="fw-medium mb-0">{selectedAddress?.streetAddress} , {selectedAddress?.city}</p>
                    </div>
                  </div>
                  <button className="btn btn-link text-warning p-0" onClick={handleOpenAddressModal}>Change

                  </button>
                </div>

                <Modal
                  show={showAddressModal}
                  onHide={handleCloseAddressModal}
                  centered
                  size="lg"
                >
                  <Modal.Header closeButton>
                    {/* <Modal.Title>Change Address</Modal.Title> */}
                  </Modal.Header>
                  <Modal.Body>
                    <Address
                      // onAddressSelect={handleAddressChange}
                      selectedAddress={selectedAddress}
                      setSelectedAddress={setSelectedAddress} />
                  </Modal.Body>
                </Modal>

                {/* Booking Details Section */}
                <div className="mb-4">
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <h3 className="fs-5 mb-0">Booking Details</h3>
                    <i className="bi bi-info-circle text-muted small"></i>
                  </div>

                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Includes</span>
                      <span>{formatRequirements()}</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Service</span>
                      <span className="text-capitalize">{service?.name}</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Gender</span>
                      <span className="text-capitalize">{gender}</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Start Date</span>
                      <span>{formatDate(bookingDate)}</span>
                    </div>

                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Work shifts</span>
                      {ShiftTime1 && <span>{`Shift 1: ${formatShiftTime(ShiftTime1)}`}</span>}
                      {ShiftTime2 && <span>{`Shift 2: ${formatShiftTime(ShiftTime2)}`}</span>}
                    </div>
                    {subScriptiondata && <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Subscription </span>
                      <span className="text-capitalize">{subScriptiondata.planName}</span>
                    </div>}
                    <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Monthly Worker Salary</span>
                      <span>₹{price}/-</span>
                    </div>
                    {subScriptiondata && <div className="list-group-item d-flex justify-content-between px-0">
                      <span className="text-muted">Subscription Price</span>
                      <span className="text-capitalize">{subScriptiondata.planPrice}</span>
                    </div>}
                  </div>
                </div>

                {/* Billing Section */}
                <div className="mb-4">
                  <h3 className="fs-5 mb-3">Billing</h3>
                  <div className="d-flex justify-content-between border-bottom pb-3">
                    <span className="text-muted">Booking Fee (Non refundable)</span>
                    <span>₹49.00</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="terms"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)} />
                    <label className="form-check-label text-muted" htmlFor="terms">
                      I agree to the {' '}
                      <span
                        className="text-warning cursor-pointer"
                        onClick={handleShow}
                        style={{ cursor: 'pointer' }}
                      >
                        Terms And Conditions
                      </span>
                    </label>
                  </div>

                  <div className="d-flex align-items-center gap-3">
                    <div className="text-end">
                      <p className="text-muted mb-0 small">Total Amount</p>
                      <p className="fw-semibold mb-0">₹{Amount}</p>
                    </div>
                    <button
                      className={`btn ${isTermsAccepted ? 'btn-warning text-white' : 'btn-secondary'}`}
                      onClick={handleBookNow}
                      disabled={!isTermsAccepted}
                    >
                      Book Now
                    </button>
                  </div>
                </div>

                {/* Bootstrap Modal */}
                <Modal show={showModal} onHide={handleClose} size="lg">
                  <Modal.Header closeButton>
                    <Modal.Title>Terms and Conditions</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <div className="mb-4">
                      <h5 className="mb-3">1. Service Agreement</h5>
                      <p className="text-muted">
                        By booking our services, you agree to engage with our service providers under the following terms:
                        - Service duration and timing as specified in the booking
                        - Payment terms as outlined in the booking details
                        - Compliance with service-specific requirements
                      </p>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3">2. Booking and Cancellation</h5>
                      <p className="text-muted">
                        - Bookings are confirmed upon payment
                        - Cancellations must be made at least 24 hours before the service
                        - Refund policy varies based on cancellation timing
                      </p>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3">3. Service Provider Conduct</h5>
                      <p className="text-muted">
                        Our service providers are committed to:
                        - Professional behavior and service delivery
                        - Maintaining confidentiality
                        - Following safety and hygiene protocols
                      </p>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3">4. Client Responsibilities</h5>
                      <p className="text-muted">
                        Clients are expected to:
                        - Provide a safe working environment
                        - Communicate any specific requirements clearly
                        - Respect service provider working hours
                      </p>
                    </div>

                    <div className="mb-4">
                      <h5 className="mb-3">5. Payment Terms</h5>
                      <p className="text-muted">
                        - All payments are processed securely
                        - Additional services will be charged separately
                        - Price adjustments may apply based on service modifications
                      </p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                      Close
                    </button>
                  </Modal.Footer>
                </Modal>
              </div></>}
        {orderStatus?.status === 'success' && (
            <OrderSuccess orderDetails={orderStatus.details} />
        )}
        
        {orderStatus?.status === 'failed' && (
            <OrderFailure 
                error={orderStatus.error}
                retryPayment={() => {
                    setOrderStatus(null);
                    handlePayment();
                }}
            />
        )}
        </div>
      </div>
    );
}

export default index