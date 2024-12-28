import mongoose from 'mongoose';
import NewWorker from './Worker.js'

const HiringSchema = new mongoose.Schema({
  workerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NewWorker', // Use the model name as a string
    required: true
  },
  serviceType: {
    type: String,
    required: true,
    enum: ['housekeeping', 'cooking', 'childcare', 'eldercare']
  },
  numberOfShifts: {
    type: Number,
    required: true
  },
  shiftTimings: {
    type: String,
    required: true
  },
  pastExperience: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'accepted', 'rejected'],
    default: 'pending'
  },
  phonenumber: {
    type: String,
    required: true
  }
}, { timestamps: true });

const HiringModel = mongoose.model('Hiring', HiringSchema);

HiringModel.submitHiringApplication = async (req, res) => {
    try {
      const {
        workerId,
        serviceType,
        numberOfShifts,
        shiftTimings,
        pastExperience,
        phoneNumber
      } = req.body;
 
      // Verify user exists
      const worker = await NewWorker.findOne({phoneNumber: phoneNumber});
      if (!worker) {
        return res.status(404).json({
          message: 'User not found'
        });
      }
 
      const newHiringApplication = new HiringModel({
        workerId: worker._id, // Use the _id of the found worker
        serviceType,
        numberOfShifts,
        shiftTimings,
        pastExperience,
        phonenumber: phoneNumber // Match the schema property name
      });
 
      const savedApplication = await newHiringApplication.save();
 
      res.status(201).json({
        message: 'Hiring application submitted successfully',
        application: savedApplication,
        success:true
      });
    } catch (error) {
      console.error(error); // Log the full error for debugging
      res.status(500).json({
        message: 'Error submitting hiring application',
        error: error.message
      });
    }
};

export default HiringModel;