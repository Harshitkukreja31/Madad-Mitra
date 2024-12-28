import express from "express"
import HiringModel from "../../models/Hiring/HiringModel.js";
const router = express.Router();

router.post('/apply', HiringModel.submitHiringApplication);
// router.get('/applications', HiringModel.getHiringApplications);
export default router;