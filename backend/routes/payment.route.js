import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckOutSession } from "../controllers/payment.controller.js";
import { stripe } from "../lib/stripe.js";


const router =express.Router();
router.post("/create_checkout-session",protectRoute,createCheckOutSession)
router.post("/checkout-success",protectRoute, async(req ,res)=>{


    try {
        const {sessionId}=req.body;
        const session= await stripe.checkout.sessions.retrive(sessionId) //retrieving the session id
        //used to fetch the details of that specific session from Stripe
        if(session.payment_status=== "paid"){
            if(session.metadata.coupon)
            {
                await coupon.findOneAndUpdate({
                    code:session.metadata.coupon,
                    userId:session.metadata.userId
                },{
                    isActive:false
                })
            }
        }


        
    } catch (error) {
        
    }



})



export default router;