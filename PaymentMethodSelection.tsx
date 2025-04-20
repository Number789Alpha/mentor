
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { CreditCard, Globe, Info } from "lucide-react";

interface PaymentMethodSelectionProps {
  paymentMethod: string;
  onPaymentMethodChange: (method: string) => void;
}

const PaymentMethodSelection = ({ 
  paymentMethod,
  onPaymentMethodChange
}: PaymentMethodSelectionProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/.{4}/g);
    const match = matches && matches[0] ? matches : [];
    const parts = [];
    for (let i = 0, len = v.length; i < len; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.slice(0, 2) + (v.length > 2 ? "/" + v.slice(2, 4) : "");
    }
    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatCardNumber(e.target.value);
    setCardNumber(value.slice(0, 19));
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = formatExpiry(e.target.value);
    setExpiry(value.slice(0, 5));
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCvv(value.slice(0, 3));
  };
  return (
    <div>
      <h3 className="text-sm font-medium mb-4">Payment Method</h3>
      <RadioGroup defaultValue={paymentMethod} onValueChange={onPaymentMethodChange}>
        <div className="flex flex-col space-y-4">
          <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "card" ? "border-primary bg-primary/5" : ""}`}>
            <RadioGroupItem value="card" id="card" className="sr-only" />
            <Label htmlFor="card" className="flex items-center cursor-pointer">
              <CreditCard className="mr-3 h-5 w-5" />
              <span className="font-medium">Credit/Debit Card</span>
            </Label>
            
            {paymentMethod === "card" && (
              <div className="mt-4 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input 
                    id="cardName" 
                    placeholder="John Doe" 
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    maxLength={50}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    maxLength={19}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      placeholder="MM/YY" 
                      value={expiry}
                      onChange={handleExpiryChange}
                      maxLength={5}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input 
                      id="cvv" 
                      placeholder="123" 
                      type="password" 
                      value={cvv}
                      onChange={handleCvvChange}
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className={`border rounded-lg p-4 cursor-pointer ${paymentMethod === "upi" ? "border-primary bg-primary/5" : ""}`}>
            <RadioGroupItem value="upi" id="upi" className="sr-only" />
            <Label htmlFor="upi" className="flex items-center cursor-pointer">
              <Globe className="mr-3 h-5 w-5" />
              <span className="font-medium">UPI</span>
            </Label>
            
            {paymentMethod === "upi" && (
              <div className="mt-4 space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="upiId">UPI ID</Label>
                  <Input 
                    id="upiId" 
                    placeholder="yourname@upi" 
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    maxLength={50}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Info className="mr-2 h-4 w-4" />
                  <span>You will receive a payment request on your UPI app</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </RadioGroup>
    </div>
  );
};

export default PaymentMethodSelection;
