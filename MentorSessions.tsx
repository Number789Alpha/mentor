
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageSquare, FileText } from "lucide-react";
import RescheduleSessionDialog from "@/components/RescheduleSessionDialog";
import { useNavigate } from "react-router-dom";

// Sample data for the sessions
const initialUpcomingSessions = [
  {
    id: 1,
    mentee: "Priya Sharma",
    date: "Today",
    time: "5:00 PM",
    topic: "Career Transition",
    image: "/placeholder.svg",
    type: "video"
  },
  {
    id: 2,
    mentee: "Arjun Patel",
    date: "Tomorrow",
    time: "3:30 PM",
    topic: "Technical Interview Prep",
    image: "/placeholder.svg",
    type: "chat"
  },
  {
    id: 3,
    mentee: "Neha Gupta",
    date: "16 Apr",
    time: "6:00 PM",
    topic: "Leadership Skills",
    image: "/placeholder.svg",
    type: "video"
  }
];

const pastSessions = [
  {
    id: 4,
    mentee: "Vikram Desai",
    date: "7 Apr",
    time: "4:00 PM",
    topic: "Resume Review",
    image: "/placeholder.svg",
    type: "video",
    feedback: 5
  },
  {
    id: 5,
    mentee: "Meera Singh",
    date: "3 Apr",
    time: "2:30 PM",
    topic: "Career Growth",
    image: "/placeholder.svg",
    type: "chat",
    feedback: 4
  },
  {
    id: 6,
    mentee: "Ankit Shah",
    date: "28 Mar",
    time: "5:30 PM",
    topic: "Technical Mentoring",
    image: "/placeholder.svg",
    type: "video",
    feedback: 5
  }
];

const sessionRequests = [
  {
    id: 7,
    mentee: "Siddharth Kapoor",
    date: "Next Monday",
    time: "3:00 PM",
    topic: "Career Advice",
    image: "/placeholder.svg",
    type: "video",
    requestedOn: "Today"
  }
];

const MentorSessions = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedSession, setSelectedSession] = useState(null);
  const [showRescheduleDialog, setShowRescheduleDialog] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState(initialUpcomingSessions);
  const [requests, setRequests] = useState(sessionRequests);
  const navigate = useNavigate();

  const handleReschedule = (session) => {
    setSelectedSession(session);
    setShowRescheduleDialog(true);
  };
  
  const handleJoinSession = (sessionId) => {
    navigate(`/join-session/${sessionId}`);
  };
  
  const handleAcceptRequest = (requestId) => {
    // Find the request
    const request = requests.find(req => req.id === requestId);
    
    if (request) {
      // Add to upcoming sessions
      setUpcomingSessions(prev => [...prev, {
        ...request,
        status: "upcoming"
      }]);
      
      // Remove from requests
      setRequests(prev => prev.filter(req => req.id !== requestId));
    }
  };
  
  const handleDeclineRequest = (requestId) => {
    // Remove from requests
    setRequests(prev => prev.filter(req => req.id !== requestId));
  };

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your upcoming and past mentorship sessions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Schedule New Session
            </Button>
          </div>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="requested">Session Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>Sessions that are scheduled to happen soon</CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingSessions.length > 0 ? (
                  <div className="space-y-6">
                    {upcomingSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.image} alt={session.mentee} />
                            <AvatarFallback>
                              {session.mentee.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.mentee}</h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{session.date}, {session.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{session.topic}</Badge>
                              <Badge variant="secondary" className="flex items-center space-x-1">
                                {session.type === "video" ? 
                                  <><Video className="h-3 w-3 mr-1" /> Video Call</> : 
                                  <><MessageSquare className="h-3 w-3 mr-1" /> Chat</>
                                }
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleReschedule(session)}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleJoinSession(session.id)}
                          >
                            Join Session
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Upcoming Sessions</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any sessions scheduled. Create a new session or check back later.
                    </p>
                    <Button className="mt-4">
                      Schedule New Session
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Sessions</CardTitle>
                <CardDescription>Review your completed mentorship sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {pastSessions.length > 0 ? (
                  <div className="space-y-6">
                    {pastSessions.map((session) => (
                      <div key={session.id} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={session.image} alt={session.mentee} />
                            <AvatarFallback>
                              {session.mentee.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.mentee}</h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>{session.date}, {session.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{session.topic}</Badge>
                              <div className="flex">
                                {[...Array(5)].map((_, index) => (
                                  <svg
                                    key={index}
                                    className={`h-4 w-4 fill-current ${
                                      index < session.feedback ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                    }`}
                                    viewBox="0 0 20 20"
                                  >
                                    <path
                                      d="M10 15.585l6.146 3.678-1.627-7.03L20 7.87l-7.272-.627L10 .585 7.272 7.243 0 7.87l5.481 4.363-1.627 7.03z"
                                    />
                                  </svg>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <FileText className="h-4 w-4 mr-1" />
                            View Notes
                          </Button>
                          <Button variant="outline" size="sm">
                            Schedule Follow-up
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Clock className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Past Sessions</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You haven't completed any sessions yet. They will appear here once done.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requested">
            <Card>
              <CardHeader>
                <CardTitle>Session Requests</CardTitle>
                <CardDescription>Mentorship sessions requested by mentees</CardDescription>
              </CardHeader>
              <CardContent>
                {requests.length > 0 ? (
                  <div className="space-y-6">
                    {requests.map((request) => (
                      <div key={request.id} className="flex items-center justify-between border-b pb-6 last:border-0 last:pb-0">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={request.image} alt={request.mentee} />
                            <AvatarFallback>
                              {request.mentee.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{request.mentee}</h4>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>Requested: {request.requestedOn}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                              <Calendar className="mr-1 h-4 w-4" />
                              <span>Proposed: {request.date}, {request.time}</span>
                            </div>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline">{request.topic}</Badge>
                              <Badge variant="secondary" className="flex items-center space-x-1">
                                {request.type === "video" ? 
                                  <><Video className="h-3 w-3 mr-1" /> Video Call</> : 
                                  <><MessageSquare className="h-3 w-3 mr-1" /> Chat</>
                                }
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleDeclineRequest(request.id)}
                          >
                            Decline
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleAcceptRequest(request.id)}
                          >
                            Accept
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Pending Requests</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any pending session requests. They will appear here when mentees request to book your time.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedSession && (
        <RescheduleSessionDialog
          open={showRescheduleDialog}
          onOpenChange={setShowRescheduleDialog}
          sessionDetails={{
            id: selectedSession.id,
            mentee: selectedSession.mentee,
            topic: selectedSession.topic,
            date: selectedSession.date,
            time: selectedSession.time
          }}
          userType="mentor"
        />
      )}
    </DashboardLayout>
  );
};

export default MentorSessions;
