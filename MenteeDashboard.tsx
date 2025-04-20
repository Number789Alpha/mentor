import React, { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, CheckCircle2, MessageSquare, Star } from "lucide-react";
import { getMenteeSessions } from "@/utils/api";
import BookingDialog from "@/components/BookingDialog";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Session, UpcomingSession } from '@/types/session';
import QuizGame from "@/components/quiz/QuizGame";


const data = [
  {
    name: "Priya Sharma",
    date: "2023-01-02",
    amount: "$9.00",
    status: "paid",
    email: "priya.sharma@example.com",
  },
  {
    name: "John Smith",
    date: "2023-01-02",
    amount: "$9.00",
    status: "paid",
    email: "john.smith@example.com",
  },
  {
    name: "Alice Johnson",
    date: "2023-01-02",
    amount: "$9.00",
    status: "paid",
    email: "alice.johnson@example.com",
  },
  {
    name: "Bob Williams",
    date: "2023-01-02",
    amount: "$9.00",
    status: "paid",
    email: "bob.williams@example.com",
  },
]

const PaymentDialog = ({ mentorName }: { mentorName?: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Make Payment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Make a Payment</DialogTitle>
          <DialogDescription>
            Enter your payment details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value={mentorName || "Mentor Name"} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" defaultValue="m@example.com" className="col-span-3" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const MenteeDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [upcomingSession, setUpcomingSession] = useState<UpcomingSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        if (user?.name) {
          const sessions = await getMenteeSessions(user.name);
          const upcoming = sessions.find((s: Session) => s.status === 'upcoming');
          if (upcoming) {
            setUpcomingSession({
              id: upcoming.id,
              mentor: upcoming.mentorName,
              mentorName: upcoming.mentorName,
              date: new Date(upcoming.date).toLocaleDateString(),
              time: upcoming.time,
              status: upcoming.status,
              sessionFormat: upcoming.sessionFormat || 'video',
              type: upcoming.type || 'general',
              topic: upcoming.topic,
              image: upcoming.image || '/mentors/placeholder.svg'
            });
          }
        }
      } catch (error) {
        console.error('Error fetching sessions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSessions();
  }, [user?.name]);
  
  const handleJoinSession = () => {
    if (upcomingSession?.id) {
      navigate(`/join-session/${upcomingSession.id}`);
    }
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Welcome, {user?.name?.split(" ")[0] || "Mentee"}! Track your progress and upcoming sessions
            </p>
          </div>
          <PaymentDialog />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Session</CardTitle>
              <CardDescription>Your next session is scheduled soon</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              {isLoading ? (
                <div className="text-center py-4">Loading...</div>
              ) : upcomingSession ? (
                <>
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <span>{upcomingSession.date}, {upcomingSession.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={upcomingSession.image} alt={`${upcomingSession.mentor} Avatar`} />
                      <AvatarFallback>{upcomingSession.mentor.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <span>With {upcomingSession.mentor}</span>
                  </div>
                  <Button variant="secondary" onClick={handleJoinSession}>Join Session</Button>
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-gray-500 mb-4">No upcoming sessions</p>
                  <BookingDialog mentorName="Choose a mentor" />
                </div>
              )}
            </CardContent>
          </Card>

  

          <Card>
            <CardHeader>
              <CardTitle>Learning Games</CardTitle>
              <CardDescription>Test your knowledge with interactive quizzes</CardDescription>
            </CardHeader>
            <CardContent>
              <QuizGame />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Stay up-to-date with your progress</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Completed "Introduction to React" course</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-blue-500" />
                <span>Sent a message to Mentor Smith</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-400" />
                <span>Rated a session 5 stars</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Sessions</CardTitle>
            <CardDescription>View your session history and upcoming appointments</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Mentor</TableHead>
                  <TableHead>Topic</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {upcomingSession && (
                  <TableRow>
                    <TableCell className="font-medium">{upcomingSession.date}</TableCell>
                    <TableCell>{upcomingSession.mentor}</TableCell>
                    <TableCell>React Fundamentals</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" onClick={handleJoinSession}>
                        Join
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell className="font-medium">Apr 7, 2024</TableCell>
                  <TableCell>Mentor Smith</TableCell>
                  <TableCell>JavaScript Basics</TableCell>
                  <TableCell className="text-right">Completed</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recommended Mentors</CardTitle>
            <CardDescription>Connect with experienced mentors ready to help you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/mentors/divyanshi-agarwal.svg" alt="Divyanshi Agarwal" />
                  <AvatarFallback>DA</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">Divyanshi Agarwal</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Crisis Ready</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Full Stack Developer | 5+ years experience</p>
                  <Button variant="outline" size="sm">Book Session</Button>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/mentors/priyank-mishra.svg" alt="Priyank Mishra" />
                  <AvatarFallback>PM</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">Priyank Mishra</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Crisis Ready</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Senior Software Engineer | Tech Lead</p>
                  <Button variant="outline" size="sm">Book Session</Button>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/mentors/placeholder.svg" alt="Rajat Kumar" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">Rajat Kumar</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Crisis Ready</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Frontend Developer | UX Specialist</p>
                  <Button variant="outline" size="sm">Book Session</Button>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/mentors/placeholder.svg" alt="Neha Singh" />
                  <AvatarFallback>NS</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold">Neha Singh</h4>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Crisis Ready</Badge>
                  </div>
                  <p className="text-sm text-gray-500">Backend Developer | System Design</p>
                  <Button variant="outline" size="sm">Book Session</Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>FAQ</CardTitle>
            <CardDescription>Answers to common questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I schedule a session?</AccordionTrigger>
                <AccordionContent>
                  To schedule a session, go to the mentor's profile and click on the "Book Session" button.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>What if I need to cancel a session?</AccordionTrigger>
                <AccordionContent>
                  You can cancel a session up to 24 hours before the scheduled time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I provide feedback to my mentor?</AccordionTrigger>
                <AccordionContent>
                  After each session, you'll receive a feedback form to rate your mentor.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default MenteeDashboard;
