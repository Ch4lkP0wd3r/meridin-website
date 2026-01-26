
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { price_amount, price_currency, order_id, order_description, success_url, cancel_url } = req.body;

    try {
        const response = await fetch("https://api.nowpayments.io/v1/invoice", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": process.env.NOWPAYMENTS_API_KEY || "PYK17X6-DWKM88W-MQ9JS7X-GTG5DZW"
            },
            body: JSON.stringify({
                price_amount,
                price_currency,
                order_id,
                order_description,
                success_url,
                cancel_url
            })
        });

        const data = await response.json();

        if (response.ok) {
            return res.status(200).json(data);
        } else {
            return res.status(response.status).json(data);
        }
    } catch (error) {
        console.error("Serverless Error:", error);
        return res.status(500).json({ message: "Internal server error during invoice generation." });
    }
}
