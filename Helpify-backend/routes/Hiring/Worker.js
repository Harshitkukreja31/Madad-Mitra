import express from "express"
import NewWorkerModel from "../../models/Hiring/Worker.js"
import uploadMiddleware from '../../middleware/uploadMiddleware.js'
const router = express.Router();


router.post('/register', uploadMiddleware.single('profileImage'),NewWorkerModel.registerWorker);
router.post('/send-otp', NewWorkerModel.sendOTP);
router.post('/verify-otp', NewWorkerModel.verifyOTP);
export default router;