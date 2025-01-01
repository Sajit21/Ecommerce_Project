import express from "express";
import { protectRoute } from "../middleware/auth.middleware";
import { createCheckOutSession } from "../controllers/payment.controller";

const router =express.Router();
router.get("/create_checkout-session",protectRoute,async(req ,res)=>{
    try {
        const {product,couponCode}= req.body;
        if(!Array.isArray(products) || products.length===0)
{
    return res.status(400).json({error: "Invalid or empty products array"})
}    
let totalAmount=0;
const lineItems  = products.map(product =>) 
    } catch (error) {
        
    }
})

export default router;