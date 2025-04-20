
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Video, ExternalLink, Clock, User, Users } from "lucide-react";
import { sessionService } from "@/services/sessionService";

const GoogleMeetRedirect = () => {
  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();
  const { sessionId } = useParams();
  
  const [sessionDetails, setSessionDetails] = useState({
    id: sessionId || '',
    meetLink: '',
    mentorName: '',
    menteeName: '',
    topic: '',
    date: '',
    time: '',
    duration: ''
  });

  useEffect(() => {
    const fetchSessionDetails = async () => {
      if (!sessionId) {
        toast({
          title: 'Error',
          description: 'No session ID provided',
          variant: 'destructive'
        });
        navigate(-1);
        return;
      }

      try {
        const session = await sessionService.joinSession(sessionId);
        if (!session.meetingLink) {
          throw new Error('No meeting link available');
        }

        setSessionDetails({
          id: session.id,
          meetLink: session.meetingLink,
          mentorName: session.mentorName || 'Mentor',
          menteeName: session.menteeName || 'Mentee',
          topic: session.topic || 'Mentoring Session',
          date: new Date(session.scheduledAt || Date.now()).toLocaleDateString(),
          time: new Date(session.scheduledAt || Date.now()).toLocaleTimeString(),
          duration: `${session.duration || 60} minutes`
        });
      } catch (error) {
        toast({
          title: 'Error',
          description: error instanceof Error ? error.message : 'Failed to load session details. Please try again.',
          variant: 'destructive'
        });
        navigate(-1);
      }
    };

    if (sessionId) {
      fetchSessionDetails();
    }
  }, [sessionId, navigate]);
  
  useEffect(() => {
    let timer: number | undefined;
    
    // Countdown timer for auto-redirect
    if (countdown > 0) {
      timer = window.setTimeout(() => setCountdown(countdown - 1), 1000);
    } else {
      // Once countdown reaches 0, redirect to Google Meet
      window.location.href = sessionDetails.meetLink;
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, sessionDetails.meetLink]);
  
  const handleManualRedirect = () => {
    window.location.href = sessionDetails.meetLink;
  };
  
  const handleCancel = () => {
    toast({
      title: "Redirection cancelled",
      description: "You can still join the meeting from your dashboard.",
    });
    
    // Navigate back to dashboard
    navigate(-1);
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Joining Google Meet</CardTitle>
          <CardDescription>
            You're being redirected to your mentoring session
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center">
                <Video className="h-5 w-5 mr-2 text-primary" />
                Mentoring Session
              </h3>
              <div className="text-sm px-3 py-1 bg-primary/10 text-primary rounded-full">
                Live in <span className="font-bold">{countdown}s</span>
              </div>
            </div>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Date & Time</p>
                  <p className="text-sm text-muted-foreground">
                    {sessionDetails.date} • {sessionDetails.time} • {sessionDetails.duration}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mentor</p>
                  <p className="text-sm text-muted-foreground">{sessionDetails.mentorName}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-2">
                <Users className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Mentee</p>
                  <p className="text-sm text-muted-foreground">{sessionDetails.menteeName}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h4 className="font-medium mb-1">Meeting Link</h4>
            <a 
              href={sessionDetails.meetLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-blue-600 dark:text-blue-400 flex items-center justify-center gap-1 hover:underline"
            >
              {sessionDetails.meetLink}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </CardContent>
        
        <CardFooter className="flex-col space-y-2">
          <Button 
            onClick={handleManualRedirect} 
            className="w-full gap-2"
          >
            <Video className="h-4 w-4" />
            Join Now
          </Button>
          <Button 
            variant="outline" 
            onClick={handleCancel}
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GoogleMeetRedirect;
