
import React from "react";
import { Button } from "@/components/ui/button";

const AccountSettings = () => {
  return (
    <div className="space-y-4">
      <Button variant="outline" className="w-full">
        Change Password
      </Button>
      <Button variant="outline" className="w-full">
        Notification Preferences
      </Button>
      <Button variant="outline" className="w-full">
        Connected Accounts
      </Button>
      <Button variant="destructive" className="w-full">
        Delete Account
      </Button>
    </div>
  );
};

export default AccountSettings;
