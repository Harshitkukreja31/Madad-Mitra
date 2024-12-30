import express from "express"
import TestimonialModel from "../../models/service/testimonials.js"

const router = express.Router();
router.get('/',TestimonialModel.getAllTestimonialCards);
export default router