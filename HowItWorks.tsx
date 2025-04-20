
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  User,
  UserCog,
  Calendar,
  CheckCircle,
  Target,
  Clock,
  ArrowRight,
  Search,
  MessageSquare,
  FileText,
  Star,
  Award
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";

const HowItWorks = () => {
  const features = [
    {
      title: "Profile Creation",
      description: "Create a detailed profile with your skills, experience, and goals.",
      icon: <User className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
    {
      title: "Mentor Matching",
      description: "Browse and connect with mentors who align with your goals.",
      icon: <Search className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
    {
      title: "Session Scheduling",
      description: "Book sessions based on your mentor's availability.",
      icon: <Calendar className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
    {
      title: "Video Consultations",
      description: "Connect via Google Meet or Zoom for personalized guidance.",
      icon: <MessageSquare className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
    {
      title: "Goal Tracking",
      description: "Set goals and track your progress with your mentor's help.",
      icon: <Target className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
    {
      title: "Resource Library",
      description: "Access curated resources to supplement your learning.",
      icon: <FileText className="h-10 w-10 text-echopurple-600 dark:text-echopurple-400" />,
    },
  ];

  return (
    <PageLayout>
      <div className="container px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            How EchoMentor Works
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A step-by-step guide to our mentorship platform
          </p>
        </div>

        {/* User Paths */}
        <div className="max-w-5xl mx-auto mb-24">
          <Tabs defaultValue="mentee" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-10">
              <TabsTrigger value="mentee">For Mentees</TabsTrigger>
              <TabsTrigger value="mentor">For Mentors</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mentee">
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">1</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Sign Up & Create Profile</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Register as a mentee and complete your profile with your background, skills, and career goals.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Find Your Ideal Mentor</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Browse mentor profiles, read reviews, and select someone who aligns with your goals.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">3</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Book Your Free Trial</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Schedule a free trial session to ensure the mentor is the right fit for your needs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="relative order-3 md:order-1">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">6</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Track Your Progress</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Monitor your growth, earn XP, and unlock achievements as you reach milestones.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative order-2">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">5</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Attend Regular Sessions</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Connect with your mentor via video calls for personalized guidance and feedback.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 right-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative order-1 md:order-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echopurple-100 dark:bg-echopurple-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echopurple-600 dark:text-echopurple-400">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Choose a Plan</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Select a subscription plan that matches your mentorship needs and budget.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 right-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="mentor">
              <div className="space-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">1</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Apply as a Mentor</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Submit your application with your expertise, experience, and why you want to mentor.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">2</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Verification Process</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Our team verifies your credentials and experience to ensure quality mentorship.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">3</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Create Your Profile</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Build a compelling mentor profile showcasing your expertise, experience, and mentorship style.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="relative order-3 md:order-1">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">6</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Earn & Grow</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Receive compensation for your expertise while building your reputation through reviews and badges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative order-2">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">5</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Conduct Sessions</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Deliver valuable guidance through video sessions and provide resources to your mentees.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 right-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                  
                  <div className="relative order-1 md:order-3">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-echoblue-100 dark:bg-echoblue-900 mb-4 relative z-10">
                        <span className="text-2xl font-bold text-echoblue-600 dark:text-echoblue-400">4</span>
                      </div>
                      <h3 className="text-xl font-semibold text-center mb-2">Set Availability & Rates</h3>
                      <p className="text-center text-gray-600 dark:text-gray-400">
                        Define your schedule and set your session rates based on your expertise level.
                      </p>
                    </div>
                    <div className="hidden md:block absolute top-8 right-full w-full h-0.5 bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Platform Features */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-16">
            Key Platform Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-md">
                <CardHeader className="pb-2">
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Premium Features */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Premium Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="bg-gradient-to-br from-echopurple-50 to-echoblue-50 dark:from-echopurple-900/20 dark:to-echoblue-900/20 p-8 rounded-xl">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <CheckCircle className="h-12 w-12 text-echopurple-600 dark:text-echopurple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Crisis Mentor Match</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Get urgent help when you need it most with our emergency mentor matching system.
                  </p>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Connect with available mentors within 15 minutes
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Get quick guidance during critical situations
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Smart matching based on your specific urgent need
                    </span>
                  </div>
                </div>
                
                <div>
                  <Link to="/pricing">
                    <Button>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-echopurple-50 to-echoblue-50 dark:from-echopurple-900/20 dark:to-echoblue-900/20 p-8 rounded-xl">
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <Award className="h-12 w-12 text-echopurple-600 dark:text-echopurple-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">XP & Achievement System</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Stay motivated and track your progress with our gamified experience system.
                  </p>
                </div>
                
                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Earn XP for completing sessions and reaching milestones
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Unlock badges and achievements as you progress
                    </span>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <span className="ml-3 text-gray-700 dark:text-gray-300">
                      Compete on leaderboards with other mentees
                    </span>
                  </div>
                </div>
                
                <div>
                  <Link to="/pricing">
                    <Button>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            What Our Users Say
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "EchoMentor connected me with a senior tech leader who helped me navigate my career transition. The structured sessions and goal tracking made a real difference in my progress."
              </p>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg"
                  alt="Aarav Patel"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Aarav Patel</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-6 italic">
                "As a mentor on EchoMentor, I've been able to give back while also improving my own leadership skills. The platform's tools make mentoring effective and enjoyable."
              </p>
              <div className="flex items-center">
                <img
                  src="/placeholder.svg"
                  alt="Vikram Sharma"
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">Vikram Sharma</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    MBA Student & Mentor
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-echopurple-600 to-echoblue-600 rounded-2xl overflow-hidden shadow-xl">
            <div className="px-6 py-12 md:p-12 text-white">
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Start Your Mentorship Journey?
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
                  Join EchoMentor today and take the first step towards achieving your professional goals.
                </p>
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link to="/signup">
                    <Button size="lg" variant="secondary">
                      Sign Up Now
                    </Button>
                  </Link>
                  <Link to="/find-mentors">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Browse Mentors
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HowItWorks;
