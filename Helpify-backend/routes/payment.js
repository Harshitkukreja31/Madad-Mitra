import express from 'express';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';
const router = express.Router();
dotenv.config();

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEYID,  // Replace with your Razorpay Key ID
    key_secret: process.env.RAZORPAY_SECRET // Replace with your Razorpay Secret Key
});

router.post('/', async (req, res) => {
    const { amount, currency } = req.body;

    try {
        const options = {
            amount: amount * 100, // Amount in paise
            currency: currency || 'INR',
            receipt: `receipt_${Math.random()}`,
        };

        const order = await razorpay.orders.create(options);
        res.json({ success: true, order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error creating Razorpay order' });
    }
});
export default router;
