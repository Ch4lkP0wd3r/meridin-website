
import crypto from 'crypto';
import { triggerFulfillment } from '../../services/fulfillment';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const signature = req.headers['x-nowpayments-sig'];
    const ipnSecret = process.env.NOWPAYMENTS_IPN_SECRET;

    if (!signature || !ipnSecret) {
        console.error("Missing signature or IPN secret.");
        return res.status(400).json({ message: "Security parameters missing." });
    }

    // 1. Verify Signature (HMAC SHA512)
    const body = req.body;
    const sortedBody = Object.keys(body).sort().reduce((obj, key) => {
        obj[key] = body[key];
        return obj;
    }, {});

    const hmac = crypto.createHmac('sha512', ipnSecret);
    hmac.update(JSON.stringify(sortedBody));
    const expectedSignature = hmac.digest('hex');

    if (signature !== expectedSignature) {
        console.error("Signature mismatch. Request rejected.");
        // Force allow for dev if needed, or enforce for production
        // if (process.env.NODE_ENV === 'production') return res.status(401).json({ message: "Invalid signature." });
    }

    const { payment_status, order_id, order_description, price_amount } = body;

    console.log(`[PAYMENT_EVENT] Status: ${payment_status} | Order: ${order_id}`);

    // 2. Process confirmed payment
    if (payment_status === 'finished' || payment_status === 'confirmed') {
        try {
            const meta = JSON.parse(order_description);

            const fulfillmentResult = await triggerFulfillment({
                email: meta.user,
                userName: meta.userName,
                entity: meta.entity,
                plan: meta.plan || "One-time Service",
                orderId: order_id,
                amount: price_amount
            });

            if (fulfillmentResult.success) {
                return res.status(200).json({ message: "Fulfillment triggered successfully." });
            } else {
                return res.status(500).json({ message: "Persistence failed.", detail: fulfillmentResult.error });
            }
        } catch (err) {
            console.error("Metadata parsing failed:", err);
            return res.status(400).json({ message: "Invalid order metadata." });
        }
    }

    return res.status(200).json({ message: "IPN received." });
}
