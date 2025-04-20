
import React from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, IndianRupee } from "lucide-react";
import { planData, PlanType } from "@/utils/planUtils";

interface PlanSelectionProps {
  planType: PlanType;
  onPlanChange: (plan: PlanType) => void;
}

const PlanSelection = ({ planType, onPlanChange }: PlanSelectionProps) => {
  const selectedPlan = planData[planType];

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Select Your Plan</h3>
      <Tabs defaultValue={planType} onValueChange={(value) => onPlanChange(value as PlanType)} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
          <TabsTrigger value="annual">Annual</TabsTrigger>
        </TabsList>
        
        <TabsContent value={planType} className="mt-0">
          <Card className="p-4 border-2 border-primary">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-medium">{planType.charAt(0).toUpperCase() + planType.slice(1)} Plan</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {selectedPlan.sessions} mentor sessions
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <IndianRupee className="h-4 w-4" />
                  <span className="text-2xl font-bold">{selectedPlan.discountedPrice}</span>
                  <span className="text-sm text-gray-500 ml-1">/{selectedPlan.term}</span>
                </div>
                {selectedPlan.discountedPrice !== selectedPlan.price && (
                  <div className="flex items-center text-sm">
                    <span className="line-through text-gray-500 mr-2">₹{selectedPlan.price}</span>
                    <span className="text-green-600 dark:text-green-500">Save {selectedPlan.savings}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                <span>Access to all certified mentors</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                <span>Unlimited messaging with your mentors</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                <span>Interactive 1-on-1 video sessions</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-500 mt-0.5" />
                <span>Personalized career guidance and resources</span>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PlanSelection;
