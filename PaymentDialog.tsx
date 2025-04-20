
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";
import { planData, PlanType } from "@/utils/planUtils";
import { CreditCard, Lock } from "lucide-react";

// Import our newly created components
import PlanSelection from "./payment/PlanSelection";
import PaymentMethodSelection from "./payment/PaymentMethodSelection";
import PaymentSummary from "./payment/PaymentSummary";
import { sessionService } from "@/services/sessionService";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const PaymentDialog = ({ open, onOpenChange, onSuccess }: PaymentDialogProps) => {
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [planType, setPlanType] = useState<PlanType>("monthly");
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing with random success/failure
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const selectedPlan = planData[planType];
      const mockAmount = selectedPlan.discountedPrice;
      
      // Simulate 90% success rate
      const isSuccess = Math.random() < 0.9;
      
      if (!isSuccess) {
        throw new Error('Transaction declined. Please try again or use a different payment method.');
      }
      
      const result = await sessionService.createPaymentIntent({
        sessionId: `mock_session_${Date.now()}`,
        mentorId: 'mock_mentor_id',
        amount: mockAmount * 100 // Convert to paise
      });

      toast({
        title: "Payment Successful",
        description: `Your ${planType} plan has been activated successfully! Transaction ID: ${result.paymentId}`,
      });
      
      if (onSuccess) onSuccess();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "An error occurred during payment",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-2">
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-6 h-6 text-echopurple-600" />
              Complete Your Subscription
            </div>
          </DialogTitle>
          <DialogDescription className="text-center text-gray-600 dark:text-gray-400">
            Choose your preferred payment plan and method
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <PlanSelection 
            planType={planType}
            onPlanChange={setPlanType}
          />
          
          <Separator />
          
          <PaymentMethodSelection 
            paymentMethod={paymentMethod}
            onPaymentMethodChange={setPaymentMethod}
          />
          
          <PaymentSummary planType={planType} />
        </div>
        
        <DialogFooter>
          <div className="space-y-4 w-full">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Lock className="w-4 h-4" />
              Secure payment powered by Stripe
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
              By proceeding, you agree to our Terms of Service and Privacy Policy
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
              <Button 
                onClick={handlePayment} 
                className="bg-echopurple-600 hover:bg-echopurple-700"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Complete Payment"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
