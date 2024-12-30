import express from "express";
import ServiceModel from '../models/service_data.js';

const router = express.Router();

router.get("/:id" , (req,res)=>{
    ServiceModel.getservice(req,
        (dbRes)=>{
            if(dbRes){
              res.send(dbRes);
            }
            else{
              res.status(204);
              res.status(dbRes);
            }
        },
        (dbErr)=>{
            console.log(dbErr.name);
            res.status(dbErr.status || 500);
            res.send({ error: dbErr.message });
        }
    )
});

export default router;