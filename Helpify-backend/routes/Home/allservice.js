import express from "express"
import AllServiceModel from "../../models/Home/allservice.js"

const router = express.Router();
router.get('/',AllServiceModel.getAllservices);
export default router