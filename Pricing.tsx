
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Check, X, HelpCircle, Link } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PageLayout from "@/components/layout/PageLayout";
import PaymentDialog from "@/components/PaymentDialog";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [currency, setCurrency] = useState<"inr" | "usd">("inr");
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const { toast } = useToast();

  const toggleBillingCycle = () => {
    setBillingCycle(billingCycle === "monthly" ? "yearly" : "monthly");
    toast({
      title: `Switched to ${billingCycle === "monthly" ? "yearly" : "monthly"} billing`,
      description: `You'll now see ${billingCycle === "monthly" ? "yearly" : "monthly"} pricing with ${billingCycle === "monthly" ? "20% discount" : "regular rates"}.`,
    });
  };

  const plans = [
    {
      name: "Free Trial",
      description: "Perfect for trying out mentorship",
      price: {
        inr: { monthly: 0, yearly: 0 },
        usd: { monthly: 0, yearly: 0 },
      },
      features: [
        { name: "One free session", included: true },
        { name: "Basic mentor matching", included: true },
        { name: "Access to public resources", included: true },
        { name: "Access to all mentors", included: false },
        { name: "Goal setting & tracking", included: false },
        { name: "Priority scheduling", included: false },
        { name: "Advanced resource library", included: false },
        { name: "Crisis mentor support", included: false },
      ],
      popular: false,
      cta: "Start Free Trial",
    },
    {
      name: "Basic",
      description: "For individuals seeking regular guidance",
      price: {
        inr: { monthly: 1999, yearly: 19190 },
        usd: { monthly: 24.99, yearly: 239.90 },
      },
      features: [
        { name: "3 sessions per month", included: true },
        { name: "Smart mentor matching", included: true },
        { name: "Access to public resources", included: true },
        { name: "Access to all mentors", included: true },
        { name: "Goal setting & tracking", included: true },
        { name: "Priority scheduling", included: false },
        { name: "Advanced resource library", included: false },
        { name: "Crisis mentor support", included: false },
      ],
      popular: true,
      cta: "Get Started",
    },
    {
      name: "Premium",
      description: "For dedicated professional growth",
      price: {
        inr: { monthly: 3499, yearly: 33590 },
        usd: { monthly: 42.99, yearly: 412.70 },
      },
      features: [
        { name: "Unlimited sessions", included: true },
        { name: "Advanced mentor matching", included: true },
        { name: "Access to all resources", included: true },
        { name: "Access to all mentors", included: true },
        { name: "Goal setting & tracking", included: true },
        { name: "Priority scheduling", included: true },
        { name: "Advanced resource library", included: true },
        { name: "Crisis mentor support", included: true },
      ],
      popular: false,
      cta: "Go Premium",
    },
  ];

  const getDiscountPercentage = (monthly: number, yearly: number) => {
    const yearlyMonthlyEquivalent = yearly / 12;
    const savings = monthly - yearlyMonthlyEquivalent;
    const percentage = Math.round((savings / monthly) * 100);
    return percentage;
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "Plan activated",
      description: `Your ${selectedPlan} plan has been activated successfully!`,
    });
    setShowPayment(false);
  };

  return (
    <PageLayout>
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Choose the plan that's right for your mentorship journey
          </p>

          <div className="flex justify-center items-center space-x-8 mb-8">
            <Tabs defaultValue="inr" className="w-full max-w-xs" onValueChange={(value) => setCurrency(value as "inr" | "usd")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="inr">₹ INR</TabsTrigger>
                <TabsTrigger value="usd">$ USD</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center justify-center space-x-2 mb-12">
            <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              Monthly
            </span>
            <Switch
              checked={billingCycle === "yearly"}
              onCheckedChange={toggleBillingCycle}
            />
            <span className={`text-sm font-medium ${billingCycle === "yearly" ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"}`}>
              Yearly
            </span>
            {billingCycle === "yearly" && (
              <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                Save 20%
              </Badge>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const price = plan.price[currency][billingCycle];
            const formattedPrice =
              currency === "inr"
                ? `₹${price.toLocaleString("en-IN")}`
                : `$${price.toFixed(2)}`;

            const discount =
              billingCycle === "yearly" &&
              plan.price[currency].monthly > 0
                ? getDiscountPercentage(
                    plan.price[currency].monthly,
                    plan.price[currency].yearly
                  )
                : 0;



            return (
              <Card
                key={plan.name}
                className={`relative ${
                  plan.popular
                    ? "border-echopurple-500 dark:border-echopurple-400 shadow-lg"
                    : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Badge className="bg-echopurple-600 hover:bg-echopurple-700">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold">
                      {formattedPrice}
                      {plan.price[currency].monthly > 0 && (
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                          /{billingCycle === "monthly" ? "month" : "year"}
                        </span>
                      )}
                    </div>
                    {billingCycle === "yearly" && discount > 0 && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Save {discount}% with annual billing
                      </p>
                    )}
                  </div>

                  <div className="space-y-4">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          {feature.included ? (
                            <Check className="h-5 w-5 text-green-500 dark:text-green-400" />
                          ) : (
                            <X className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                          )}
                        </div>
                        <span
                          className={`ml-3 text-sm ${
                            feature.included
                              ? "text-gray-700 dark:text-gray-300"
                              : "text-gray-500 dark:text-gray-500"
                          }`}
                        >
                          {feature.name}
                          {feature.name === "Crisis mentor support" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-3.5 w-3.5 ml-1 inline text-gray-400" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p className="w-64 text-xs">
                                    Emergency access to available mentors for urgent career or academic guidance within 15 minutes.
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => {
                      setSelectedPlan(plan.name.toLowerCase());
                      setShowPayment(true);
                    }}
                    className={`w-full ${plan.popular ? 'bg-echopurple-600 hover:bg-echopurple-700' : ''}`}
                    variant={plan.popular ? 'default' : 'outline'}
                  >
                    {plan.cta}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Can I change my plan later?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your plan will be applied at the start of your next billing cycle.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                How do the mentor sessions work?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Sessions are typically 45-60 minutes long and conducted via Google Meet or Zoom. You can book sessions based on your mentor's availability through our scheduling system.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The free trial includes one mentorship session with a mentor of your choice. You'll also get access to basic platform features to help you decide if EchoMentor is right for you.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We accept all major credit/debit cards, UPI, netbanking, and digital wallets. All payments are securely processed through our payment gateways.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">
                Can I get a refund if I'm not satisfied?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with your experience, contact our support team within 7 days of your purchase for a full refund.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-3xl mx-auto mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
            Our team is here to help you find the perfect mentorship plan
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
            <Link to="/signup">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>

      <PaymentDialog
        open={showPayment}
        onOpenChange={setShowPayment}
        onSuccess={handlePaymentSuccess}
      />
    </PageLayout>
  );
};

export default Pricing;
