
import React from "react";
import { Separator } from "@/components/ui/separator";
import { IndianRupee } from "lucide-react";
import { planData, PlanType } from "@/utils/planUtils";

interface PaymentSummaryProps {
  planType: PlanType;
}

const PaymentSummary = ({ planType }: PaymentSummaryProps) => {
  const selectedPlan = planData[planType];

  return (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-2">
      <div className="flex justify-between items-center">
        <span>Plan Subtotal</span>
        <span>₹{selectedPlan.price}</span>
      </div>
      {selectedPlan.discountedPrice !== selectedPlan.price && (
        <div className="flex justify-between items-center text-green-600 dark:text-green-500">
          <span>Discount ({selectedPlan.savings})</span>
          <span>-₹{selectedPlan.price - selectedPlan.discountedPrice}</span>
        </div>
      )}
      <Separator className="my-2" />
      <div className="flex justify-between items-center font-medium">
        <span>Total Amount</span>
        <div className="flex items-center">
          <IndianRupee className="h-4 w-4 mr-1" />
          <span>{selectedPlan.discountedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
