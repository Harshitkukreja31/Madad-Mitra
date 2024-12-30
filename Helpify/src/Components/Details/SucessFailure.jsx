import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

const OrderSuccess = ({ orderDetails }) => {
  return (
    <div className="text-center p-5 bg-white rounded shadow">
      <CheckCircle 
        className="text-success mb-4" 
        size={64} // Explicit size for Lucide icon
      />
      <h2 className="display-6 fw-bold mb-2">Booking Successful!</h2>
      <p className="text-muted mb-4">Your booking has been confirmed</p>
      
      <div className="bg-light p-4 rounded text-start mb-4">
        <h3 className="fw-semibold mb-2">Booking Details:</h3>
        <p className="text-muted mb-1">Order ID: {orderDetails.orderId}</p>
        <p className="text-muted mb-1">Payment ID: {orderDetails.paymentId}</p>
        <p className="text-muted mb-1">Amount Paid: ₹{orderDetails.amount}</p>
      </div>
      
      <button 
        className="btn btn-success"
        onClick={() => window.location.href = '/dashboard'}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

const OrderFailure = ({ error, retryPayment }) => {
  return (
    <div className="text-center p-5 bg-white rounded shadow">
      <XCircle 
        className="text-danger mb-4" 
        size={64} // Explicit size for Lucide icon
      />
      <h2 className="display-6 fw-bold mb-2">Payment Failed</h2>
      <p className="text-muted mb-4">
        {error || 'There was an issue processing your payment'}
      </p>
      
      <div className="d-flex gap-3 justify-content-center">
        <button 
          className="btn btn-danger"
          onClick={retryPayment}
        >
          Retry Payment
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => window.location.href = '/'}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export { OrderSuccess, OrderFailure };