import express from "express";
import AddressModel from "../models/address.js";
import { verifyToken } from "../utils/helpers.js";

const router = express.Router();

router.post('/' , verifyToken , (req,res)=>{
    AddressModel.addAddress(
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
    AddressModel.getAddress(
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