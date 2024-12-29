import express from "express";
import BookingDataModel from '../models/bookingdata.js';
import { verifyToken } from "../utils/helpers.js";
const router = express.Router();
router.post('/',verifyToken , (req,res)=>{
    BookingDataModel.addData(
        req,
        req.body,
        (dbRes)=>{
            res.status(201);           
            res.send(dbRes);
        },
        (dbErr)=>{
            res.status(500);
            res.send(dbErr);
        }
    )
})
router.get('/', verifyToken , (req,res)=>{
    BookingDataModel.getData(
    req,
    (dbRes)=>{
        res.status(201);
        res.send(dbRes);
    },
    (dbErr)=>{
        res.status(500);
        res.send(dbErr);
    }
)
})
export default router;