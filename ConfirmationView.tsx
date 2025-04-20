
import React from "react";
import { format } from "date-fns";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import { generateMeetLink } from "@/utils/meetingUtils";

interface ConfirmationViewProps {
  date: Date | undefined;
  time: string;
  topic: string;
  duration: string;
  isFreeSession: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onConfirm?: () => void;
}

const ConfirmationView = ({ date, time, topic, duration, isFreeSession, onSubmit, onConfirm }: ConfirmationViewProps) => {
  const meetLink = generateMeetLink();

  const handleConfirmation = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!date || !time || !topic) {
        throw new Error('Missing required session information');
      }
      onSubmit(e);
      onConfirm?.();
    } catch (error) {
      console.error('Confirmation error:', error);
      toast({
        title: "Error",
        description: "Please ensure all required fields are filled",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Session Confirmed!</DialogTitle>
        <DialogDescription>
          Your {isFreeSession ? 'free trial' : ''} session has been scheduled.
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-4 py-4">
        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="font-semibold">Session Details</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {date ? format(date, 'PPP') : ''} at {time} ({duration} min)
              </p>
            </div>
            <Video className="h-5 w-5 text-primary" />
          </div>
          
          <div>
            <h5 className="text-sm font-medium">Topic</h5>
            <p className="text-sm text-gray-600 dark:text-gray-300">{topic}</p>
          </div>
          
          <div>
            <h5 className="text-sm font-medium">Google Meet Link</h5>
            <a href={meetLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
              {meetLink}
            </a>
            <p className="text-xs text-gray-500 mt-1">
              This link will be emailed to you and will be available in your dashboard.
            </p>
          </div>
        </div>
      </div>
      
      <DialogFooter>
        <Button onClick={handleConfirmation}>Done</Button>
      </DialogFooter>
    </>
  );
};

export default ConfirmationView;
