import express from "express"
import serviceCarouselModel from "../../models/service/serviceCarousel.js"

const router = express.Router();
router.get('/',serviceCarouselModel.getAllCarouselCards);
export default router