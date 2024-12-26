import mongoose from 'mongoose';

const SubscriptionPlans = [
  {
    title: "Silver Membership",
    discount: "50%",
    description: "Three months trial plan to get you started",
    duration: "3 Months",
    price: {
      total: 12532,
      discounted: 5639,
      monthly: 940,
    },
    membershipInfo: {
      title: "Three Months Membership Period",
      details: [
        "You are eligible for 1 free worker replacement.",
        "All the workers are experienced and verified.",
        "*Prices are exclusive of GST",
      ],
    },
  },
  {
    title: "Gold Membership",
    discount: "55%",
    description: "Pay for 5 months and get 1 month free!",
    duration: "6 Months",
    price: {
      total: 12532,
      discounted: 5639,
      monthly: 940,
    },
    membershipInfo: {
      title: "Six Months Membership Period",
      details: [
        "You are eligible for 3 free worker replacements.",
        "All the workers are experienced and verified.",
        "*Prices are exclusive of GST",
      ],
    },
  },
  {
    title: "Diamond Membership",
    discount: "63%",
    description: "Pay for 10 months and get 2 months free!",
    duration: "12 Months",
    price: {
      total: 12532,
      discounted: 5639,
      monthly: 940,
    },
    membershipInfo: {
      title: "Twelve Months Membership Period",
      details: [
        "You are eligible for 5 free worker replacements.",
        "All the workers are experienced and verified.",
        "*Prices are exclusive of GST",
      ],
    },
  },
  {
    title: "Platinum Membership",
    discount: "50%",
    description: "Pay for 20 months and get 4 months free!",
    duration: "24 Months",
    price: {
      total: 12532,
      discounted: 5639,
      monthly: 940,
    },
    membershipInfo: {
      title: "Two Years Membership Period",
      details: [
        "You are eligible for 10 free worker replacements.",
        "All the workers are experienced and verified.",
        "*Prices are exclusive of GST",
      ],
    },
  },
];

const SubscriptionPlanSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    discount: {
        type: String,
        required: true,
        match: /^\d+%$/  
      },
      description: {
        type: String,
        required: true
      },
      duration: {
        type: String,
        required: true
      },
      price: {
        total: {
          type: Number,
          required: true,
          min: 0
        },
        discounted: {
          type: Number,
          required: true,
          min: 0
        },
        monthly: {
          type: Number,
          required: true,
          min: 0
        }
      },
      membershipInfo: {
        title: {
          type: String,
          required: true
        },
        details: {
          type: [String],
          validate: {
            validator: function(v) {
              return v.length > 0;
            },
            message: 'Membership details array cannot be empty'
          }
        }
      }
});

const SubscriptionPlanModel = new mongoose.model('SubscriptionPlan',SubscriptionPlanSchema);

const insertifnotexist = async ()=>{
  try{
     const exitingcount =  await SubscriptionPlanModel.countDocuments();

     if(exitingcount==0){
        await SubscriptionPlanModel.insertMany(SubscriptionPlans);
        console.log("Subscription plan data inserted successfully");
     }
  }
  catch(error){
    console.error("Error inserting subscription plan",error);
  }
}

insertifnotexist();

export default SubscriptionPlanModel;
