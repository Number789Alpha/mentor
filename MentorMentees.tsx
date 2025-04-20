
import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Clock, MessageSquare, ArrowUpRight, Filter } from "lucide-react";

// Sample data for the mentees
const activeMentees = [
  {
    id: 1,
    name: "Priya Sharma",
    goal: "Career Transition to Product Management",
    sessions: 8,
    lastSession: "2 days ago",
    nextSession: "Tomorrow, 5:00 PM",
    image: "/placeholder.svg",
    progress: 65,
  },
  {
    id: 2,
    name: "Arjun Patel",
    goal: "Technical Interview Preparation",
    sessions: 5,
    lastSession: "4 days ago",
    nextSession: "Thursday, 3:30 PM",
    image: "/placeholder.svg",
    progress: 40,
  },
  {
    id: 3,
    name: "Neha Gupta",
    goal: "Leadership Skill Development",
    sessions: 3,
    lastSession: "1 week ago",
    nextSession: "Apr 16, 6:00 PM",
    image: "/placeholder.svg",
    progress: 25,
  },
];

const pastMentees = [
  {
    id: 4,
    name: "Vikram Desai",
    goal: "Resume Building and Career Advice",
    sessions: 6,
    lastSession: "1 month ago",
    completionDate: "Mar 28, 2023",
    image: "/placeholder.svg",
    progress: 100,
  },
  {
    id: 5,
    name: "Meera Singh",
    goal: "Frontend Development Skills",
    sessions: 12,
    lastSession: "2 months ago",
    completionDate: "Feb 15, 2023",
    image: "/placeholder.svg",
    progress: 100,
  },
];

const requestedMentees = [
  {
    id: 6,
    name: "Ankit Shah",
    goal: "System Design Learning",
    requestDate: "Apr 5, 2023",
    message: "I'm looking to improve my system design skills for senior developer roles. I've been working as a developer for 4 years and want to level up my architecture knowledge.",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Divya Patel",
    goal: "Career Switch to Data Science",
    requestDate: "Apr 3, 2023",
    message: "Currently working as a business analyst and looking to transition to a data science role. Need guidance on building the right skills and portfolio.",
    image: "/placeholder.svg",
  },
];

const MentorMentees = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Mentees</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track and manage your mentorship relationships
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <MessageSquare className="mr-2 h-4 w-4" />
              Message All Mentees
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              placeholder="Search mentees..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <Tabs defaultValue="active" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="active">Active Mentees</TabsTrigger>
            <TabsTrigger value="past">Past Mentees</TabsTrigger>
            <TabsTrigger value="requests">Mentorship Requests</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Mentees</CardTitle>
                <CardDescription>Mentees you're currently working with</CardDescription>
              </CardHeader>
              <CardContent>
                {activeMentees.length > 0 ? (
                  <div className="space-y-6">
                    {activeMentees.map((mentee) => (
                      <div key={mentee.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentee.image} alt={mentee.name} />
                            <AvatarFallback>
                              {mentee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold text-lg">{mentee.name}</h3>
                              <Badge variant="outline" className="w-fit">
                                {mentee.sessions} Sessions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Goal: {mentee.goal}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Last session: {mentee.lastSession}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>Next session: {mentee.nextSession}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                                <span className="text-sm font-medium">{mentee.progress}%</span>
                              </div>
                              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-echopurple-500 rounded-full"
                                  style={{ width: `${mentee.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 self-end md:self-center mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm">
                              <ArrowUpRight className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Active Mentees</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any active mentees at the moment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Mentees</CardTitle>
                <CardDescription>Mentees with completed mentorship programs</CardDescription>
              </CardHeader>
              <CardContent>
                {pastMentees.length > 0 ? (
                  <div className="space-y-6">
                    {pastMentees.map((mentee) => (
                      <div key={mentee.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentee.image} alt={mentee.name} />
                            <AvatarFallback>
                              {mentee.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold text-lg">{mentee.name}</h3>
                              <Badge variant="outline" className="w-fit">
                                {mentee.sessions} Sessions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Goal: {mentee.goal}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Clock className="mr-1 h-4 w-4" />
                                <span>Last session: {mentee.lastSession}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>Completed on: {mentee.completionDate}</span>
                              </div>
                            </div>

                            <div className="mt-4 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                                <span className="text-sm font-medium">Complete</span>
                              </div>
                              <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500 rounded-full"
                                  style={{ width: '100%' }}
                                ></div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 self-end md:self-center mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="mr-1 h-4 w-4" />
                              Message
                            </Button>
                            <Button size="sm">
                              <ArrowUpRight className="mr-1 h-4 w-4" />
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Past Mentees</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any past mentees with completed programs.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Mentorship Requests</CardTitle>
                <CardDescription>People who have requested you as a mentor</CardDescription>
              </CardHeader>
              <CardContent>
                {requestedMentees.length > 0 ? (
                  <div className="space-y-6">
                    {requestedMentees.map((request) => (
                      <div key={request.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={request.image} alt={request.name} />
                            <AvatarFallback>
                              {request.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold text-lg">{request.name}</h3>
                              <Badge variant="outline" className="w-fit">
                                Requested on {request.requestDate}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              Goal: {request.goal}
                            </p>
                            <div className="mt-3 bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                              <p className="text-sm italic">"{request.message}"</p>
                            </div>
                          </div>
                          <div className="flex flex-col gap-2 self-end md:self-center mt-4 md:mt-0">
                            <Button variant="outline" size="sm">
                              Decline
                            </Button>
                            <Button size="sm">
                              Accept Request
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <UserIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Pending Requests</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any mentorship requests at the moment.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

// Creating a simple user icon since we don't have it from lucide-react
const UserIcon = ({ className = "" }) => (
  <svg 
    className={className} 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

export default MentorMentees;
