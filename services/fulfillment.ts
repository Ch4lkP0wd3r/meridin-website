
import { supabase } from './supabase';

/**
 * Meridin & Co.™ Fulfillment Service
 * Handles post-payment actions like database updates and automated emails.
 */

export const triggerFulfillment = async (orderData: {
    email: string;
    userName?: string;
    entity?: string;
    plan: string;
    orderId: string;
    amount: number;
}) => {
    console.log(`>>> TRIGERRED FULFILLMENT: ${orderData.orderId}`);

    // 1. Database Persistence Logic (Supabase)
    const { data, error } = await supabase
        .from('orders')
        .insert([
            {
                order_id: orderData.orderId,
                user_email: orderData.email,
                user_name: orderData.userName,
                entity: orderData.entity,
                plan_name: orderData.plan,
                amount: orderData.amount,
                status: 'confirmed',
                created_at: new Date().toISOString()
            }
        ]);

    if (error) {
        console.error("Supabase Error:", error.message);
        return { success: false, error: error.message };
    }

    // 2. Automated Email Delivery (Placeholder for Resend/SendGrid)
    // Example: await sendWelcomeEmail(orderData.email, orderData.plan);

    return { success: true, data };
};
