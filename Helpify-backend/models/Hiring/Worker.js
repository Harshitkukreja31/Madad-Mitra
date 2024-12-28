import mongoose from 'mongoose';
import twilio from "twilio";
import dotenv from 'dotenv';
dotenv.config();
const TWILIO_ACCOUNT_SID= process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN= process.env.TWILIO_AUTH_TOKEN;
const TWILIO_VERIFY_SERVICE_SID= process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);


const NewWorkerSchema = new mongoose.Schema({
  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    // unique: true 
  },
 
  phoneNumber: { 
    type: String, 
    required: true, 
    // unique: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ['male', 'female', 'other'],
    required: true 
  },
  profileImage: { 
    type: String 
  },
  verified: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

const NewWorkerModel = mongoose.model('NewWorker', NewWorkerSchema);

NewWorkerModel.registerWorker = async (req, res) => {
  try {
    const { 
      firstName, 
      lastName, 
      email, 
      dateOfBirth, 
      phoneNumber, 
      address, 
      gender 
    } = req.body;

    console.log("Received request body:", req.body);

    const profileImage = req.file ? req.file.path : null;

    // Check if user exists
    // const existingUser = await NewWorkerModel.findOne({ 
    //   $or: [{ email }, { phoneNumber }] 
    // });

    // if (existingUser) {
    //   return res.status(400).json({ 
    //     message: 'User already exists with this email or phone number' 
    //   });
    // }

    const newUser = {
      firstName,
      lastName,
      email,
      dateOfBirth,
      phoneNumber,
      address,
      gender,
      profileImage
    };

    console.log("Creating new user:", newUser);

    // Insert into database
    await NewWorkerModel.create(newUser);

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: newUser 
    });
  } catch (error) {
    console.error("Error occurred during registration:", error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};



NewWorkerModel.sendOTP= async (req, res) => {
    const { phonenumber } = req.body;
    const newPhoneNumber = "+91" + phonenumber;
  
    client.verify.v2.services
      .create({friendlyName: 'My Verify Service'})
      .then((service) => {
        console.log(service.sid);
        const opts = {
          to: newPhoneNumber,
          channel: "sms",
          // passing the service sid
          serviceSid: service.sid
        };
  
        client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID).verifications
          .create(opts)
          .then((verification) => {
            console.log(verification.status);
            res.status(200).send({ "status": "success", "message": "OTP Send Successfully", "id": verification.sid });
          })
          .catch((err) => {
            console.log(err);
            res.status(200).send({ "status": "failed", "message": "Unable to Send OTP" });
          })
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send({ status: "error", message: "An error occurred while creating verify service" });
      });
  };
NewWorkerModel.verifyOTP = async (req, res) => {
  
  const { phonenumber, code } = req.body;
  console.log(code);
  const newPhoneNumber = "+91" + phonenumber;
  client.verify.v2.services(TWILIO_VERIFY_SERVICE_SID)
    .verificationChecks
    .create({to: newPhoneNumber, code: code})
    .then((verification_check) => {
      console.log(verification_check.status);
      if (verification_check.status === "approved") {
        res.status(200).send({ status: "success", message: "OTP Verified!!" });
      } else {
        res.status(400).send({ status: "failure", message: "OTP not Verified, Please enter it again!!" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "error", message: "An error occurred while verifying the OTP" });
    });
};
export default NewWorkerModel;