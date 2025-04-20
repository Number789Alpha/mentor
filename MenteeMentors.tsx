import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Calendar, MessageSquare, Star, ArrowUpRight } from "lucide-react";
import MessageMentorDialog from "@/components/MessageMentorDialog";

// Sample data for mentors
const currentMentors = [
  {
    id: 1,
    name: "Divyanshi Agarwal",
    title: "Frontend Development Expert",
    specialties: ["Frontend Development", "React", "UI/UX"],
    sessions: 5,
    lastSession: "3 days ago",
    nextSession: "Tomorrow, 3:00 PM",
    image: "/mentors/divyanshi-agarwal.svg",
    rating: 5,
  },
  {
    id: 2,
    name: "Priyank Mishra",
    title: "Senior Backend Engineer",
    specialties: ["Backend Development", "System Design", "Node.js"],
    sessions: 7,
    lastSession: "1 day ago",
    nextSession: "Thursday, 2:30 PM",
    image: "/mentors/priyank-mishra.svg",
    rating: 5,
  },
];

const recommendedMentors = [
  {
    id: 3,
    name: "Ankit Verma",
    title: "Product Manager at TechX",
    specialties: ["Product Strategy", "UX", "Career Transition"],
    experience: "7+ years",
    rating: 4.9,
    reviews: 28,
    pricing: "₹1,800/session",
    availability: "Next available: Today",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    title: "Senior Product Manager at InnovateCo",
    specialties: ["Product Management", "Agile", "Leadership"],
    experience: "9+ years",
    rating: 4.8,
    reviews: 35,
    pricing: "₹2,000/session",
    availability: "Next available: Tomorrow",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    title: "Director of Product at StartupHub",
    specialties: ["Career Guidance", "Interview Coaching", "Product Vision"],
    experience: "12+ years",
    rating: 4.7,
    reviews: 19,
    pricing: "₹2,500/session",
    availability: "Next available: Thursday",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Neha Shah",
    title: "UX Lead at DesignFirst",
    specialties: ["User Research", "Product Design", "UX Strategy"],
    experience: "8+ years",
    rating: 4.8,
    reviews: 22,
    pricing: "₹1,900/session",
    availability: "Next available: Friday",
    image: "/placeholder.svg",
  },
];

const categories = [
  "All Categories",
  "Product Management",
  "UX/UI Design",
  "Software Development",
  "Data Science",
  "Career Transition",
  "Leadership",
  "Marketing",
];

const MenteeMentors = () => {
  const [activeTab, setActiveTab] = useState("current");
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [showMessageDialog, setShowMessageDialog] = useState(false);

  const handleMessageMentor = (mentor) => {
    setSelectedMentor(mentor);
    setShowMessageDialog(true);
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Mentors</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your mentors and find new ones
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Book New Session
            </Button>
          </div>
        </div>

        <Tabs defaultValue="current" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="current">Current Mentors</TabsTrigger>
            <TabsTrigger value="find">Find Mentors</TabsTrigger>
            <TabsTrigger value="past">Past Mentors</TabsTrigger>
          </TabsList>

          <TabsContent value="current">
            <Card>
              <CardHeader>
                <CardTitle>Current Mentors</CardTitle>
                <CardDescription>Mentors you're actively working with</CardDescription>
              </CardHeader>
              <CardContent>
                {currentMentors.length > 0 ? (
                  <div className="space-y-6">
                    {currentMentors.map((mentor) => (
                      <div key={mentor.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={mentor.image} alt={mentor.name} />
                            <AvatarFallback>
                              {mentor.name.split(" ").map(n => n[0]).join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-1">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <h3 className="font-semibold text-lg">{mentor.name}</h3>
                              <Badge variant="outline" className="w-fit">
                                {mentor.sessions} Sessions
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {mentor.title}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {mentor.specialties.map((specialty, index) => (
                                <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 mt-2">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>Last session: {mentor.lastSession}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <Calendar className="mr-1 h-4 w-4" />
                                <span>Next session: {mentor.nextSession}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col gap-3 self-end md:self-center mt-4 md:mt-0">
                            <div className="flex">
                              {[...Array(5)].map((_, index) => (
                                <Star
                                  key={index}
                                  className={`h-4 w-4 ${
                                    index < mentor.rating
                                      ? "text-yellow-400 fill-yellow-400"
                                      : "text-gray-300 dark:text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMessageMentor(mentor)}
                              >
                                <MessageSquare className="mr-1 h-4 w-4" />
                                Message
                              </Button>
                              <Button size="sm">
                                Book Session
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <PersonIcon className="h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium">No Current Mentors</h3>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                      You don't have any active mentors at the moment. Let's find you a mentor!
                    </p>
                    <Button className="mt-4" onClick={() => setActiveTab("find")}>
                      Find Mentors
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="find">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  placeholder="Search mentors by name or specialty..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select defaultValue={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Mentors</CardTitle>
                <CardDescription>Find mentors based on your goals and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {recommendedMentors.map((mentor) => (
                    <div key={mentor.id} className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={mentor.image} alt={mentor.name} />
                          <AvatarFallback>
                            {mentor.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h3 className="font-semibold">{mentor.name}</h3>
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{mentor.rating}</span>
                              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                                ({mentor.reviews})
                              </span>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {mentor.title}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Experience: {mentor.experience}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {mentor.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex flex-col">
                              <div className="text-sm font-medium">{mentor.pricing}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{mentor.availability}</div>
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleMessageMentor(mentor)}
                              >
                                <MessageSquare className="h-4 w-4 mr-1" />
                                Message
                              </Button>
                              <Button size="sm">
                                Book
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <Button variant="outline">View All Mentors</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past">
            <Card>
              <CardHeader>
                <CardTitle>Past Mentors</CardTitle>
                <CardDescription>Mentors you've worked with in the past</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <PersonIcon className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No Past Mentors</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                    You don't have any past mentors. Completed mentorships will appear here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {selectedMentor && (
        <MessageMentorDialog
          open={showMessageDialog}
          onOpenChange={setShowMessageDialog}
          mentor={selectedMentor}
        />
      )}
    </DashboardLayout>
  );
};

// Simple person icon since we don't have an exact one from lucide-react
const PersonIcon = ({ className = "" }) => (
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

export default MenteeMentors;
