import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Video, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import PaymentDialog from "./PaymentDialog";
import BookingForm from "./booking/BookingForm";
import ConfirmationView from "./booking/ConfirmationView";
import { Session, SessionStatus, SessionType } from '@/types/session';
import { sessionService } from "@/services/sessionService";
import { generateMeetLink } from "@/utils/meetingUtils";

interface SessionData extends Session {
  menteeEmail: string;
  isFollowUp: boolean;
  type: SessionType | 'crisis';
  status: SessionStatus;
  scheduledAt: string;
  meetingLink?: string;
}

interface BookingDialogProps {
  mentorName: string;
  trigger?: React.ReactNode;
  onSessionCreated?: (sessionData: SessionData) => void;
}

const BookingDialog = ({ mentorName, trigger, onSessionCreated }: BookingDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("30");
  const [topic, setTopic] = useState("");
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();

  const [isFreeSession, setIsFreeSession] = useState(true);
  const [isCrisisMeeting, setIsCrisisMeeting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user && user.sessionsBooked && user.sessionsBooked > 0) {
      setIsFreeSession(false);
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    setStep(1);
    navigate("/mentee/sessions");
  };

  const handleComplete = async () => {
    if (isSubmitting) return;

    if (!date || !time || !topic) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      if (!isFreeSession) {
        setShowPayment(true);
      } else {
        const success = await proceedWithBooking();
        if (success) {
          setStep(2);
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const proceedWithBooking = async () => {
    const meetLink = generateMeetLink();
    
    const sessionData: SessionData = {
      mentorId: user!.mentorId,
      menteeId: user!.id,
      mentorName: mentorName,
      menteeName: user!.name,
      mentorEmail: user!.mentorEmail || '',
      menteeEmail: user!.email,
      scheduledAt: new Date(`${format(date!, 'yyyy-MM-dd')}T${time}`).toISOString(),
      topic: topic,
      duration: parseInt(duration),
      type: isCrisisMeeting ? 'crisis' : 'general',
      status: "upcoming",
      isFollowUp: false,
      notes: "",
      meetingLink: meetLink,
      date: format(date!, 'yyyy-MM-dd'),
      time: time,
      id: "",
      isFreeSession: isFreeSession
    };

    const response = await sessionService.createSession(sessionData);
    
    if (onSessionCreated) {
      onSessionCreated({
        ...sessionData,
        id: response.id,
        menteeEmail: user!.email,
        isFollowUp: false,
        type: 'general',
        status: 'upcoming'
      });
    }

    if (user) {
      user.sessionsBooked = (user.sessionsBooked || 0) + 1;
    }

    toast({
      title: "Session Booked Successfully!",
      description: `Your session with ${mentorName} has been scheduled for ${format(date!, 'PPP')} at ${time}.`,
    });

    return true;
  };
  
  const handlePaymentSuccess = async () => {
    setShowPayment(false);
    const success = await proceedWithBooking();
    if (success) {
      setStep(2);
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          {trigger || <Button>Book {isFreeSession ? 'Free Trial' : 'Session'}</Button>}
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px]">
          {step === 1 ? (
            <>
              <DialogHeader>
                <DialogTitle>
                  {isCrisisMeeting ? (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle className="h-5 w-5" />
                      Book an Urgent Crisis Meeting
                    </div>
                  ) : (
                    <>Book a {isFreeSession ? 'Free Trial' : ''} Session</>
                  )}
                </DialogTitle>
                <DialogDescription>
                  {isCrisisMeeting
                    ? "Request an immediate consultation for urgent situations."
                    : `Schedule a ${isFreeSession ? 'free trial' : ''} session with ${mentorName}.`
                  }
                </DialogDescription>
              </DialogHeader>
              
              <BookingForm 
                date={date}
                setDate={setDate}
                time={time}
                setTime={setTime}
                duration={duration}
                setDuration={setDuration}
                topic={topic}
                setTopic={setTopic}
                onComplete={handleComplete}
                isFreeSession={isFreeSession}
                isCrisisMeeting={isCrisisMeeting}
                setIsCrisisMeeting={setIsCrisisMeeting}
              />
            </>
          ) : (
            <ConfirmationView
              date={date}
              time={time}
              duration={duration}
              topic={topic}
              isFreeSession={isFreeSession}
              onSubmit={handleSubmit}
            />
          )}
        </DialogContent>
      </Dialog>
      
      <PaymentDialog 
        open={showPayment} 
        onOpenChange={setShowPayment} 
        onSuccess={handlePaymentSuccess}
      />
    </>
  );
};

export default BookingDialog;