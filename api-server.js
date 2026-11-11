import express from 'express';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import 'dotenv/config';

const app = express();
app.use(express.json());

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// POST /api/create-order
app.post('/api/create-order', async (req, res) => {
  try {
    const { amount = 5000, currency = 'INR', receipt } = req.body; // amount in paise (default 50 INR)

    // Validate minimum amount (100 paise = 1 INR)
    if (amount < 100) {
      return res.status(400).json({ error: 'Amount must be at least 100 paise (1 INR)' });
    }

    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt: receipt || `meridin_${Date.now()}`,
    });

    res.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Error creating order:', error);
    
    // Handle auth failures
    if (error.status === 401 || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Authentication failed with Razorpay API' });
    }
    
    res.status(500).json({ error: 'Failed to create order', details: error.message });
  }
});

// POST /api/verify-payment
app.post('/api/verify-payment', (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required payment fields' });
    }

    // Generate HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Compare signatures
    const signatureMatch = generatedSignature === razorpay_signature;

    if (!signatureMatch) {
      return res.status(400).json({ error: 'Payment signature verification failed' });
    }

    res.json({
      success: true,
      message: 'Payment verified successfully',
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    });
  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ error: 'Failed to verify payment', details: error.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Razorpay API server running on port ${PORT}`);
});
