import React, { useState } from 'react';

interface RazorpayCheckoutProps {
  amount?: number; // in paise (e.g., 5000 = 50 INR)
  currency?: string;
  description?: string;
  onPaymentSuccess?: (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }) => void;
  onPaymentError?: (error: string) => void;
  onPaymentCancel?: () => void;
  buttonText?: string;
  loadingText?: string;
}

declare global {
  interface Window {
    Razorpay?: new (options: object) => {
      open: () => void;
      on: (event: string, callback: (data: any) => void) => void;
    };
  }
}

export const RazorpayCheckout: React.FC<RazorpayCheckoutProps> = ({
  amount = 5000,
  currency = 'INR',
  description = 'Payment for services',
  onPaymentSuccess,
  onPaymentError,
  onPaymentCancel,
  buttonText = 'Pay Now',
  loadingText = 'Processing...',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);

  const createOrder = async (): Promise<string> => {
    const response = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create order');
    }

    const data = await response.json();
    setOrderId(data.order_id);
    return data.order_id;
  };

  const verifyPayment = async (paymentDetails: {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }): Promise<boolean> => {
    const response = await fetch('/api/verify-payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(paymentDetails),
    });

    const data = await response.json();
    return response.ok && data.success;
  };

  const handlePayment = async () => {
    setIsLoading(true);

    try {
      // Create order first
      await createOrder();

      // Load Razorpay script
      await loadRazorpayScript();

      if (!window.Razorpay) {
        throw new Error('Razorpay SDK failed to load');
      }

      const options = {
        key_id: import.meta.env.VITE_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: 'Meridin & Co™',
        description,
        order_id: orderId,
        handler: async (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) => {
          try {
            const verified = await verifyPayment(response);
            if (verified) {
              onPaymentSuccess?.(response);
            } else {
              onPaymentError?.('Payment verification failed. Please try again.');
            }
          } catch (error) {
            onPaymentError?.('Payment verification failed. Please try again.');
          }
          setIsLoading(false);
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        theme: {
          color: '#000000',
        },
        modal: {
          ondismiss: () => {
            onPaymentCancel?.();
            setIsLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      // Handle payment failed event
      razorpay.on('payment.failed', (response: any) => {
        onPaymentError?.(response.error?.description || 'Payment failed. Please try again.');
        setIsLoading(false);
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initiate payment';
      onPaymentError?.(errorMessage);
      setIsLoading(false);
    }
  };

  const loadRazorpayScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Razorpay SDK'));
      document.body.appendChild(script);
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={`
        w-full py-4 md:py-6 rounded-2xl text-[10px] md:text-[11px] font-bold tracking-[0.4em] uppercase
        transition-all duration-500 overflow-hidden relative
        ${isLoading 
          ? 'bg-white/30 text-white/50 cursor-not-allowed' 
          : 'bg-white text-black hover:bg-white/90'
        }
      `}
    >
      <span className={`transition-all duration-500 block ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        {isLoading ? loadingText : buttonText}
      </span>
      <span className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isLoading ? 'opacity-100' : 'opacity-0'}`}>
        {isLoading ? (
          <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        ) : null}
      </span>
    </button>
  );
};
