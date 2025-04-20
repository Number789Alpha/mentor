
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Video, MessageSquare, FileText } from "lucide-react";
import { format } from "date-fns";
import BookingDialog from "@/components/BookingDialog";
import RescheduleSessionDialog from "@/components/RescheduleSessionDialog";
import FollowUpSessionDialog from "@/components/FollowUpSessionDialog";
import { useNavigate } from "react-router-dom";

// Sample data for the sessions
const initialUpcomingSessions = [
  {
    id: 1,
    mentor: "Divyanshi Agarwal",
    date: "Today",
    time: "5:00 PM",
    topic: "Career Transition",
    image: "/mentors/divyanshi-agarwal.svg",
    type: "video",
    mentee: "Aashika"
  },
  {
    id: 2,
    mentor: "Priyank Mishra",
    date: "Next Tuesday",
    time: "4:30 PM",
    topic: "Technical Interview Prep",
    image: "/mentors/priyank-mishra.svg",
    type: "chat",
    mentee: "Harsh"
  },
  {
    id: 3,
    mentor: "Priyank Mishra",
    date: "Next Wednesday",
    time: "3:30 PM",
    topic: "Code Review",
    image: "/mentors/priyank-mishra.svg",
    type: "video",
    mentee: "Karan"
  }
];

const pastSessions = [
  {
    id: 4,
    mentor: "Divyanshi Agarwal",
    date: "Apr 5",
    time: "4:00 PM",
    topic: "Resume Review",
    image: "/mentors/divyanshi-agarwal.svg",
    type: "video",
    notes: "Discussed improvements to resume layout and content. Action items: Reorganize experience section, add metrics, update skills.",
    mentee: "Aashika"
  },
  {
    id: 5,
    mentor: "Priyank Mishra",
    date: "Mar 28",
    time: "5:30 PM",
    topic: "Career Planning",
    image: "/mentors/priyank-mishra.svg",
    type: "chat",
    notes: "Mapped out 6-month career transition plan. Key focus: networking, building portfolio projects, interview preparation.",
    mentee: "Harsh"
  }
];

const recommendedMentors = [
  {
    id: 1,
    name: "Ankit Verma",
    title: "Product Manager at TechX",
    specialties: ["Product Strategy", "UX", "Career Transition"],
    rating: 4.9,
    reviews: 28,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "Sneha Gupta",
    title: "Senior Product Manager at InnovateCo",
    specialties: ["Product Management", "Agile", "Leadership"],
    rating: 4.8,
    reviews: 35,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Vikram Malhotra",
    title: "Director of Product at StartupHub",
    specialties: ["Career Guidance", "Interview Coaching", "Product Vision"],
    rating: 4.7,
    reviews: 19,
    image: "/placeholder.svg"
  }
];

const MenteeSessions = () => {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [upcomingSessions, setUpcomingSessions] = useState(initialUpcomingSessions);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isFollowUpOpen, setIsFollowUpOpen] = useState(false);
  const navigate = useNavigate();

  // Handler for creating a new session
  const handleNewSession = (sessionData: any) => {
    const newSession = {
      id: parseInt(sessionData.id),
      mentor: sessionData.mentorName,
      date: sessionData.date,
      time: sessionData.time,
      topic: sessionData.topic,
      image: "/placeholder.svg",
      type: "video",
      mentee: sessionData.mentee || "Anonymous"
    };
    
    setUpcomingSessions(prev => [...prev, newSession]);
  };
  
  // Handler for joining a session
  const handleJoinSession = (sessionId: number) => {
    navigate(`/join-session/${sessionId}`);
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your upcoming and past mentorship sessions
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <BookingDialog 
              mentorName="Choose a mentor" 
              trigger={
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Book New Session
                </Button>
              }
              onSessionCreated={handleNewSession}
            />
          </div>
        </div>

        <Tabs defaultValue="upcoming" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="upcoming">Upcoming Sessions</TabsTrigger>
            <TabsTrigger value="past">Past Sessions</TabsTrigger>
            <TabsTrigger value="find">Find Mentors</TabsTrigger>
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
                            <AvatarImage src={session.image} alt={session.mentor} />
                            <AvatarFallback>
                              {session.mentor.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{session.mentor}</h4>
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
                            onClick={() => {
                              setSelectedSession(session);
                              setIsRescheduleOpen(true);
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedSession(session);
                              setIsFollowUpOpen(true);
                            }}
                          >
                            Follow-up
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
                      You don't have any sessions scheduled. Let's find you a mentor!
                    </p>
                    <Button className="mt-4" onClick={() => setActiveTab("find")}>
                      Find Mentors
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
                  <div className="space-y-8">
                    {pastSessions.map((session) => (
                      <div key={session.id} className="border-b pb-8 last:border-0 last:pb-0">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={session.image} alt={session.mentor} />
                              <AvatarFallback>
                                {session.mentor.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-semibold">{session.mentor}</h4>
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
                            <Button variant="outline" size="sm">
                              <FileText className="h-4 w-4 mr-1" />
                              Download Notes
                            </Button>
                            <Button 
                              size="sm"
                              onClick={() => {
                                setSelectedSession(session);
                                setIsFollowUpOpen(true);
                              }}
                            >
                              Book Follow-up
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mb-4">
                          <h5 className="font-medium text-sm mb-2">Session Notes:</h5>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {session.notes}
                          </p>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-sm mb-2">Your Feedback:</h5>
                          <div className="flex items-center mb-2">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className="h-5 w-5 text-yellow-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">Excellent Session</span>
                          </div>
                          <p className="text-sm italic text-gray-500 dark:text-gray-400">
                            "Very helpful session that provided clear next steps for my career transition plan."
                          </p>
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

          <TabsContent value="find">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Mentors</CardTitle>
                <CardDescription>Mentors who match your goals and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  {recommendedMentors.map((mentor) => (
                    <div key={mentor.id} className="border rounded-lg overflow-hidden">
                      <div className="p-4">
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={mentor.image} alt={mentor.name} />
                            <AvatarFallback>
                              {mentor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-semibold">{mentor.name}</h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{mentor.title}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center mt-3 text-sm">
                          <div className="flex">
                            {[...Array(5)].map((_, index) => (
                              <svg
                                key={index}
                                className={`h-4 w-4 ${
                                  index < Math.floor(mentor.rating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                              </svg>
                            ))}
                          </div>
                          <span className="ml-1">{mentor.rating}</span>
                          <span className="mx-1">•</span>
                          <span>{mentor.reviews} reviews</span>
                        </div>
                        
                        <div className="mt-3">
                          <h5 className="text-sm font-medium mb-2">Specialties:</h5>
                          <div className="flex flex-wrap gap-1">
                            {mentor.specialties.map((specialty, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="mt-4 flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Profile
                          </Button>
                          <BookingDialog 
                            mentorName={mentor.name}
                            trigger={
                              <Button size="sm" className="flex-1">
                                Book Session
                              </Button>
                            }
                            onSessionCreated={handleNewSession}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">
                    View All Mentors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {selectedSession && (
          <>
            <RescheduleSessionDialog
              open={isRescheduleOpen}
              onOpenChange={setIsRescheduleOpen}
              sessionDetails={{
                id: selectedSession.id,
                mentor: selectedSession.mentor,
                topic: selectedSession.topic,
                date: selectedSession.date,
                time: selectedSession.time
              }}
              userType="mentee"
            />
            <FollowUpSessionDialog
              open={isFollowUpOpen}
              onOpenChange={setIsFollowUpOpen}
              sessionDetails={{
                id: selectedSession.id,
                mentor: selectedSession.mentor,
                topic: selectedSession.topic
              }}
            />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MenteeSessions;
