import express from "express";
import ServiceHeroModel from "../../models/service/serviceHero.js"

const router = express.Router();
router.get('/:serviceType', ServiceHeroModel.getServiceById);

export default router;