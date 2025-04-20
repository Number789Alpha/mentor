
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AtSign, MapPin, Phone } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";

interface PersonalInfoFormProps {
  initialEmail: string;
  initialPhone: string;
  initialLocation: string;
  initialLanguages: string;
}

const PersonalInfoForm = ({
  initialEmail,
  initialPhone,
  initialLocation,
  initialLanguages,
}: PersonalInfoFormProps) => {
  const [email, setEmail] = useState(initialEmail);
  const [phone, setPhone] = useState(initialPhone);
  const [location, setLocation] = useState(initialLocation);
  const [languages, setLanguages] = useState(initialLanguages);
  
  const { user, setUser } = useUser();
  
  const handleSavePersonalInfo = () => {
    // Update user context with the new data
    if (user) {
      setUser({
        ...user,
        email: email
      });
    }
    
    toast({
      title: "Personal Information Updated",
      description: "Your personal information has been successfully updated.",
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="email">Email Address</Label>
        <div className="flex">
          <div className="relative flex-1">
            <AtSign className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <div className="flex">
          <div className="relative flex-1">
            <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="location">Location</Label>
        <div className="flex">
          <div className="relative flex-1">
            <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input 
              id="location" 
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9" 
            />
          </div>
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="languages">Languages Spoken</Label>
        <Input 
          id="languages" 
          value={languages}
          onChange={(e) => setLanguages(e.target.value)}
        />
      </div>

      <Button className="w-full" onClick={handleSavePersonalInfo}>Save Personal Information</Button>
    </div>
  );
};

export default PersonalInfoForm;
