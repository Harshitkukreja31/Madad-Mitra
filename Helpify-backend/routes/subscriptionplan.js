import express from "express";
import SubscriptionPlanModel from '../models/subscriptionplan.js';

const router = express.Router();

router.get('/' , async (req,res)=>{
   try{
      const data = await SubscriptionPlanModel.find();
      console.log(data);
      res.send(data);
   }
   catch(error){
    res.status(500);
    console.log("Error geting Subscription plan data",error);
   }
});
export default router;