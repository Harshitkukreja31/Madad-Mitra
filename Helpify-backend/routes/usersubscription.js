import express from 'express';
import UserSubscriptionModel from '../models/usersubscription.js';
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

router.get("/", verifyToken, (req, res) => {
    UserSubscriptionModel.getdetails(req,
        (dbRes) => {
            if (dbRes) {
                res.status(201).json(dbRes); // Send success response with JSON
            } else {
                res.status(404).json({ message: "Subscription not found" });
            }
        },
        (dbErr) => {
            res.status(500).json({ error: dbErr.message || "Internal Server Error" });
        }
    );
});


router.post("/",verifyToken , (req,res)=>{
    UserSubscriptionModel.adddetails(req,
        req.body,
        (dbRes)=>{
            res.status(200);
            res.send(dbRes);
        },
        (dbErr)=>{
            res.send(dbErr);
            res.status(500);
        }
    )
});

export default router;