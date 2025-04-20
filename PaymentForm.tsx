import React from 'react';
import { useApiRequest } from '@/hooks/use-api-request';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface PaymentFormProps {
  sessionId: string;
  mentorId: string;
  amount: number;
  onSuccess?: () => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  sessionId,
  mentorId,
  amount,
  onSuccess,
  onCancel,
}) => {
  const { execute: initiatePayment, isLoading } = useApiRequest(
    async () => {
      // For demo purposes, using test mode
      const options = {
        key: 'rzp_test_51NNNNNNNNNNNNNNx', // Test key for demo
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        name: 'Echo Rise Mentorship',
        description: 'Session Payment',
        order_id: sessionId,
        handler: async function (response: any) {
          try {
            // Verify payment on backend
            const verifyResponse = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            if (!verifyResponse.ok) throw new Error('Payment verification failed');
            
            toast({
              title: 'Payment Successful',
              description: 'Your session has been booked!'
            });
            onSuccess?.();
          } catch (error) {
            toast({
              title: 'Payment Verification Failed',
              description: 'Please contact support if amount was deducted',
              variant: 'destructive'
            });
          }
        },
        prefill: {
          name: 'Demo User',
          email: 'demo@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#3B82F6'
        },
        modal: {
          confirm_close: true,
          escape: false
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

      return new Promise((resolve) => {
        // Demo mode - always resolve successfully
        resolve({ success: true });
      });
    },
    {
      onError: (error) => {
        toast({
          title: 'Payment Failed',
          description: error.message,
          variant: 'destructive',
        });
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await initiatePayment();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold">Payment Details</h3>
        <p className="text-sm text-gray-500">
          Amount to pay: ₹{amount.toFixed(2)}
        </p>
      </div>

      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Pay Now'}
        </Button>
      </div>
    </form>
  );
};

export default PaymentForm;