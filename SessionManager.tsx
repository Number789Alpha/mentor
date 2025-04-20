import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface SessionManagerProps {
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
  mode: "reschedule" | "follow-up";
}

const SessionManager = ({
  open,
  onOpenChange,
  sessionDetails,
  userType,
  mode
}: SessionManagerProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("15:00");
  const [notes, setNotes] = useState("");
  const [topic, setTopic] = useState(mode === "follow-up" ? "" : sessionDetails.topic);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
  ];

  const handleSubmit = async () => {
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for the session.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "reschedule" && !notes.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rescheduling.",
        variant: "destructive",
      });
      return;
    }

    if (mode === "follow-up" && !topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please specify the topic for the follow-up session.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Here we would make an API call to update the session
      // For now, we'll just show a success message
      const action = mode === "reschedule" ? "rescheduled" : "scheduled";
      toast({
        title: `Session ${action}`,
        description: `Your session has been ${action} to ${format(date, "PPP")} at ${time}.`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: `Failed to ${mode} session. Please try again.`,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>
            {mode === "reschedule" ? "Reschedule Session" : "Schedule Follow-up Session"}
          </DialogTitle>
          <DialogDescription>
            {mode === "reschedule"
              ? `Pick a new date and time for your session with ${userType === "mentor" ? sessionDetails.mentee : sessionDetails.mentor}`
              : "Schedule a follow-up session to continue the mentorship journey"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {mode === "reschedule" && (
            <div>
              <Label className="mb-2 block">Current Session Details</Label>
              <div className="border rounded-lg p-3 bg-gray-50 dark:bg-gray-800">
                <p><strong>Topic:</strong> {sessionDetails.topic}</p>
                <p><strong>Current Date & Time:</strong> {sessionDetails.date}, {sessionDetails.time}</p>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="date" className="mb-2 block">Select Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3"
                disabled={(date) => date < new Date()}
              />
            </div>

            <div className="md:w-[180px]">
              <Label htmlFor="time" className="mb-2 block">Select Time</Label>
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

              {mode === "follow-up" && (
                <div className="mt-4">
                  <Label htmlFor="topic" className="mb-2 block">Session Topic</Label>
                  <Textarea
                    id="topic"
                    placeholder="What would you like to discuss?"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {mode === "reschedule" && (
                <div className="mt-4">
                  <Label htmlFor="reason" className="mb-2 block">Reason for Rescheduling</Label>
                  <Textarea
                    id="reason"
                    placeholder="Please provide a reason..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>
            {mode === "reschedule" ? "Confirm Reschedule" : "Schedule Follow-up"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SessionManager;