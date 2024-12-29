import express from "express";
import cityModel from "../models/citydata.js";
const router = express.Router();
router.get('/' , async(req,res)=>{
    try {
        const cities = await cityModel.find();
        console.log("cities",cities);
        res.json(cities);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})
export default router;