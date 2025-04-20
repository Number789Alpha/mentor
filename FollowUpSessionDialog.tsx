import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface FollowUpSessionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sessionDetails: {
    id: number;
    mentor: string;
    topic: string;
  };
}

const FollowUpSessionDialog = ({
  open,
  onOpenChange,
  sessionDetails,
}: FollowUpSessionDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState("15:00");
  const [topic, setTopic] = useState(sessionDetails.topic);
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!date) {
      toast({
        title: "Date Required",
        description: "Please select a date for the follow-up session.",
        variant: "destructive",
      });
      return;
    }

    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please specify a topic for the follow-up session.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Follow-up Session Booked",
      description: `Your follow-up session has been scheduled for ${format(date, "PPP")} at ${time}.`,
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
          <DialogTitle>Book Follow-up Session</DialogTitle>
          <DialogDescription>
            Schedule a follow-up session with {sessionDetails.mentor}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="date" className="mb-2 block">Session Date</Label>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-3"
                disabled={(date) => date < new Date()}
              />
            </div>
            <div className="md:w-[180px]">
              <Label htmlFor="time" className="mb-2 block">Session Time</Label>
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

              <Label htmlFor="topic" className="mt-4 mb-2 block">Session Topic</Label>
              <Textarea
                id="topic"
                placeholder="What would you like to discuss?"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                rows={2}
              />

              <Label htmlFor="notes" className="mt-4 mb-2 block">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any specific points you'd like to cover..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Book Follow-up</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FollowUpSessionDialog;