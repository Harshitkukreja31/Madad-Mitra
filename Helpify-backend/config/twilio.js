import twilio from 'twilio';

const twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID, 
    process.env.TWILIO_AUTH_TOKEN
);


const twilioVerifyService = process.env.TWILIO_VERIFY_SERVICE_SID;

module.exports = { 
  twilioClient, 
  twilioVerifyService 
};