import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckOutSession } from "../controllers/payment.controller.js";
import Coupon from "../models/coupon.model.js"
import {stripe} from "../lib/stripe.js"

const router =express.Router();
router.get("/create_checkout-session",protectRoute,async(req ,res)=>{
    try {
        const {product,couponCode}= req.body;
        if(!Array.isArray(products) || products.length===0)
            //hamro products haru aaray format ma chaina bhani ra tesko length
{
    return res.status(400).json({error: "Invalid or empty products array"})
}    
let totalAmount=0;
const lineItems  = products.map(product => {
    const amount = Math.round(product.price * 100)  //just gives the amount in cents
    totalAmount += amount * product.quantity

    return{
        price_data:{
            currency:"usd",
            product_data:{
                name:product.name,
                image:[product.image]
            },
            unit_amount: amount
        }
    }
})

    let coupon= null
    if(couponCode)
    {
        coupon= await Coupon.findOne({code:couponCode,userId:req.user._id,isActive:true})
        if(coupon){
            totalAmount -= Math.round(totalAmount * coupon.discountPercentage / 100)
        }
    }
    
    const session= await stripe.checkout.session.create({
        payment_method_type:["card"],
        line_items: lineItems,
        mode: "payment", //indicating the one time code
        success_url:`${process.env.CLIENT_URL}/purachase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.CLIENT_URL}/purchase-cancel`,
        discounts: coupon
        ?[ 
            {
                coupon: await createStripeCoupon(coupon.discountPercentage),

            },
        ]
        :[],
        metadata:{
            userId:req.user._id.toString(),
            couponCode:couponCode || ""

        }
    });
    if(totalAmount>=20000){
        await createNewCoupon(req.user._id)
    }
    } catch (error) {
        
    }
})


async function createStripeCoupon(discountPercentage){
    const coupon = await stripe.coupons.create({
        percent_off: discountPercentage,
        duration: "once",
    })

    return coupon.id;

}

async function createNewCoupon(userId){
    const newConpupon = new Coupon({
        code:"GIFT" + Math.random().toString(36).substring(2,8).toUpperCase(),
        //Base-36 includes numbers (0-9) and letters (a-z), making it a compact alphanumeric representation.
        discountPercentage:10,
        expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000 ),
        userId:userId


    })

    await newCoupon.save();
}
{

}



export default router;