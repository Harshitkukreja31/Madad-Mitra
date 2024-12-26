import express from "express"
import serviceTimeleineModel from "../../models/service/serviceTimeline.js"

const router = express.Router();
router.get('/',serviceTimeleineModel.getTimeline);
export default router