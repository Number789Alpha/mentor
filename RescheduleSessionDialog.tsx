
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface RescheduleSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionDetails: {
    id: number;
    mentee?: string;
    mentor?: string;
    topic: string;
    date: string;
    time: string;
  };
  userType: "mentor" | "mentee";
}

const RescheduleSessionDialog = ({ 
  open, 
  onOpenChange, 
  sessionDetails, 
  userType 
}: RescheduleSessionDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("15:00");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for rescheduling.",
        variant: "destructive",
      });
      return;
    }

    if (!reason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rescheduling.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Session Rescheduled",
      description: `Your session has been rescheduled to ${format(date, "PPP")} at ${time}.`,
    });
    onOpenChange(false);
  };

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Reschedule Session</DialogTitle>
          <DialogDescription>
            Pick a new date and time for your mentoring session with {userType === "mentor" ? sessionDetails.mentee : sessionDetails.mentor}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div>
            <Label className="mb-2 block">Current Session Details</Label>
            <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
              <p><strong>Topic:</strong> {sessionDetails.topic}</p>
              <p><strong>Current Date & Time:</strong> {sessionDetails.date}, {sessionDetails.time}</p>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="date" className="mb-2 block">New Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="md:w-[180px]">
              <Label htmlFor="time" className="mb-2 block">New Time</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Label htmlFor="reason" className="mt-4 mb-2 block">Reason for Rescheduling</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for rescheduling..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={5}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Confirm Reschedule</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleSessionDialog;
