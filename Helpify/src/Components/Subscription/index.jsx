import React, { useState, useEffect } from "react";

const DomesticHelpSubscription = ({setSubscription , setSubscriptiondata}) => {
  const [SubscriptionData, setSubscriptionDataBackend] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const fetchSubscriptionData = async () => {
    try {
      const response = await fetch("http://ec2-13-61-26-86.eu-north-1.compute.amazonaws.com:8084/subscriptionplandata");
      const data = await response.json();
      console.log(data);
      setSubscriptionDataBackend(data);
      setSelectedPlan(data[0]); // Set the first plan as the default selected plan
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subscription data:", error);
      setLoading(false);
    }
  };
  
  const handlesubscription = ()=>{
      setSubscription(null);
      setSubscriptiondata({planName:selectedPlan.title, planPrice:selectedPlan.price.total});
  }
  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!selectedPlan) {
    return (
      <div className="container text-center py-5">
        <p className="text-danger">No subscription plans available.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 px-4 py-8">
      <div className="row">
        {/* Subscription Plan Options */}
        <div className="col-12 col-md-6 mb-4">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {SubscriptionData.map((plan) => (
              <div key={plan.title} className="col">
                <div
                  className={`card cursor-pointer shadow-sm ${
                    selectedPlan.title === plan.title
                      ? "border-primary bg-light"
                      : "border-secondary"
                  }`}
                  onClick={() => handlePlanSelection(plan)}
                >
                  <div className="card-header bg-primary text-white">
                    <h5 className="card-title">{plan.title}</h5>
                  </div>
                  <div className="card-body">
                    <p className="card-text text-muted">{plan.description}</p>
                    <p className="text-primary h3">{plan.discount} Off</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Plan Details */}
        <div className="col-12 col-md-6">
          <div className="card border-primary shadow-lg">
            <div className="card-header bg-primary text-white">
              <h5 className="card-title">{selectedPlan.title}</h5>
            </div>
            <div className="card-body">
              <p className="text-muted mb-4">{selectedPlan.description}</p>
              <p className="h3 font-weight-bold mb-4 text-success">
                {selectedPlan.duration}
              </p>

              <div className="row mb-4">
                <div className="col">
                  <p className="text-muted">Total Cost</p>
                  <p className="font-weight-bold">
                    ₹{selectedPlan.price.total}
                  </p>
                </div>
                <div className="col">
                  <p className="text-muted">Discounted</p>
                  <p className="font-weight-bold text-danger">
                    ₹{selectedPlan.price.discounted}
                  </p>
                </div>
                <div className="col">
                  <p className="text-muted">Monthly</p>
                  <p className="font-weight-bold">
                    ₹{selectedPlan.price.monthly}
                  </p>
                </div>
              </div>

              <div>
                <p className="font-weight-medium mb-2">
                  {selectedPlan.membershipInfo.title}
                </p>
                <ul className="list-unstyled">
                  {selectedPlan.membershipInfo.details.map((detail, index) => (
                    <li key={index} className="text-muted">
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <button className="btn btn-primary w-100 py-3" onClick={handlesubscription}>Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomesticHelpSubscription;


