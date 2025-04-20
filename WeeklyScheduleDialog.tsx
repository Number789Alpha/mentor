import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WeeklyScheduleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  scheduleDetails: {
    activeDays: string[];
    totalSlots: number;
    bufferTime: string;
    maxDailySessions: string;
    isAvailableForUrgent: boolean;
  };
}

const WeeklyScheduleDialog = ({
  open,
  onOpenChange,
  onConfirm,
  scheduleDetails
}: WeeklyScheduleDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirm Schedule Update</DialogTitle>
          <DialogDescription>
            Please review your schedule changes before confirming.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Active Days</h4>
            <p className="text-sm text-gray-500">
              {scheduleDetails.activeDays.join(', ')}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium">Schedule Summary</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>Total Time Slots: {scheduleDetails.totalSlots}</li>
              <li>Buffer Time: {scheduleDetails.bufferTime} minutes</li>
              <li>Max Daily Sessions: {scheduleDetails.maxDailySessions}</li>
              <li>
                Urgent Sessions: {scheduleDetails.isAvailableForUrgent ? 'Available' : 'Not Available'}
              </li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onConfirm}>
            Confirm Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WeeklyScheduleDialog;