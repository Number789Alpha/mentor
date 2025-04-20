
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useUser } from "@/contexts/UserContext";
import { Calendar, Clock, Download, Star, Target, TrendingUp, Users } from "lucide-react";
import { analyticsService } from "@/services/analyticsService";
import AnalyticsCharts from "@/components/analytics/AnalyticsCharts";

const MentorAnalytics = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("3m");
  
  // Sample data
  const kpiData = [
    {
      title: "Total Sessions",
      value: "21",
      change: "+12% from last quarter",
      icon: <Calendar className="h-5 w-5" />,
    },
    {
      title: "Hours Mentored",
      value: "84",
      change: "+8% from last quarter",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      title: "Active Mentees",
      value: "6",
      change: "+5 from last quarter",
      icon: <Users className="h-5 w-5" />,
    },
    {
      title: "Completion Rate",
      value: "92%",
      change: "+3% from last quarter",
      icon: <TrendingUp className="h-5 w-5" />,
    },
  ];
  
  // Sample session data
  const sessionData = [
    { month: "Jan", completed: 12, canceled: 2 },
    { month: "Feb", completed: 14, canceled: 1 },
    { month: "Mar", completed: 16, canceled: 3 },
    { month: "Apr", completed: 18, canceled: 2 },
    { month: "May", completed: 15, canceled: 1 },
    { month: "Jun", completed: 20, canceled: 3 },
  ];
  
  // Sample mentee progress data
  const menteeProgress = [
    {
      id: 1,
      name: "Aashika Jain",
      role: "Frontend Developer",
      sessionsCompleted: 12,
      goalsAchieved: 3,
      totalGoals: 5,
      progress: 60,
    },
    {
      id: 2,
      name: "Harsh Shukla",
      role: "UX Designer",
      sessionsCompleted: 8,
      goalsAchieved: 4,
      totalGoals: 4,
      progress: 100,
    },
    {
      id: 3,
      name: "Karan Singh",
      role: "Product Manager",
      sessionsCompleted: 6,
      goalsAchieved: 2,
      totalGoals: 6,
      progress: 33,
    },
    {
      id: 4,
      name: "Vikram Malhotra",
      role: "Backend Developer",
      sessionsCompleted: 10,
      goalsAchieved: 3,
      totalGoals: 6,
      progress: 50,
    },
    {
      id: 5,
      name: "Priya Verma",
      role: "Data Scientist",
      sessionsCompleted: 4,
      goalsAchieved: 1,
      totalGoals: 4,
      progress: 25,
    },
  ];
  
  // Sample feedback data
  const feedbackData = [
    {
      id: 1,
      date: "Apr 3, 2025",
      menteeName: "Rahul Sharma",
      rating: 5,
      comment: "Excellent guidance on system design concepts. I was able to apply the advice directly in my next interview.",
      sentiment: "positive",
    },
    {
      id: 2,
      date: "Mar 28, 2025",
      menteeName: "Aisha Patel",
      rating: 4,
      comment: "Very helpful session on React best practices. Would have appreciated more code examples.",
      sentiment: "neutral",
    },
    {
      id: 3,
      date: "Mar 15, 2023",
      menteeName: "Vikram Malhotra",
      rating: 5,
      comment: "The career advice was invaluable. I've already started implementing the suggested changes to my job search strategy.",
      sentiment: "positive",
    },
    {
      id: 4,
      date: "Mar 10, 2025",
      menteeName: "Priya Verma",
      rating: 3,
      comment: "Session was informative but felt rushed towards the end. Would prefer more structured agenda next time.",
      sentiment: "negative",
    },
  ];
  
  // Calculate average rating
  const avgRating = feedbackData.reduce((acc, item) => acc + item.rating, 0) / feedbackData.length;

  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track your mentoring impact and performance
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Time Range:</span>
              <div className="flex border rounded-md overflow-hidden">
                <button
                  className={`px-3 py-1.5 text-sm ${
                    timeRange === "1m" ? "bg-echopurple-100 text-echopurple-700 dark:bg-echopurple-900 dark:text-echopurple-300" : "bg-transparent"
                  }`}
                  onClick={() => setTimeRange("1m")}
                >
                  1M
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${
                    timeRange === "3m" ? "bg-echopurple-100 text-echopurple-700 dark:bg-echopurple-900 dark:text-echopurple-300" : "bg-transparent"
                  }`}
                  onClick={() => setTimeRange("3m")}
                >
                  3M
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${
                    timeRange === "6m" ? "bg-echopurple-100 text-echopurple-700 dark:bg-echopurple-900 dark:text-echopurple-300" : "bg-transparent"
                  }`}
                  onClick={() => setTimeRange("6m")}
                >
                  6M
                </button>
                <button
                  className={`px-3 py-1.5 text-sm ${
                    timeRange === "1y" ? "bg-echopurple-100 text-echopurple-700 dark:bg-echopurple-900 dark:text-echopurple-300" : "bg-transparent"
                  }`}
                  onClick={() => setTimeRange("1y")}
                >
                  1Y
                </button>
              </div>
            </div>
            <Button variant="outline" className="flex gap-2">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {kpiData.map((kpi, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {kpi.title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{kpi.value}</h3>
                  </div>
                  <div className="bg-gray-100 p-2 rounded-full dark:bg-gray-800">
                    {kpi.icon}
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-500 font-medium">{kpi.change}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="mentees">Mentee Progress</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Sessions Overview</CardTitle>
                  <CardDescription>Completed vs. Canceled Sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">Sessions chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Mentee Progress</CardTitle>
                  <CardDescription>Goal achievement rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] flex items-center justify-center border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800">
                    <p className="text-gray-500 dark:text-gray-400">Progress chart would be displayed here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mentoring Impact</CardTitle>
                  <CardDescription>Key metrics and growth trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Avg. Rating</h4>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(avgRating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                />
                              </svg>
                            ))}
                            <span className="ml-2 text-sm font-medium">
                              {avgRating.toFixed(1)}
                            </span>
                          </div>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${(avgRating / 5) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Session Completion</h4>
                          <span className="text-sm font-medium">92%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-2 bg-green-400 rounded-full"
                            style={{ width: "92%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">Goal Achievement</h4>
                          <span className="text-sm font-medium">78%</span>
                        </div>
                        <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                          <div
                            className="h-2 bg-blue-400 rounded-full"
                            style={{ width: "78%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="h-[200px] flex items-center justify-center border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800">
                        <p className="text-gray-500 dark:text-gray-400">Impact trend chart would be displayed here</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <CardTitle>Session Analytics</CardTitle>
                <CardDescription>Detailed view of your mentoring sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border-2 border-dashed rounded-lg border-gray-200 dark:border-gray-800 mb-6">
                  <p className="text-gray-500 dark:text-gray-400">Detailed session analytics chart would be displayed here</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Sessions</h4>
                    <p className="text-3xl font-bold">84</p>
                    <p className="text-sm text-green-500">+12% from last quarter</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Avg. Duration</h4>
                    <p className="text-3xl font-bold">54 min</p>
                    <p className="text-sm text-green-500">+6 min from last quarter</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</h4>
                    <p className="text-3xl font-bold">92%</p>
                    <p className="text-sm text-green-500">+3% from last quarter</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Top Session Type</h4>
                    <p className="text-3xl font-bold">Career</p>
                    <p className="text-sm text-gray-500">41% of all sessions</p>
                  </div>
                </div>
                <div className="mt-8">
                  <h4 className="text-sm font-medium mb-4">Session Distribution</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">By Topic</span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                              <span className="text-sm">Career Development</span>
                            </div>
                            <span className="text-sm font-medium">41%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                              <span className="text-sm">Technical Skills</span>
                            </div>
                            <span className="text-sm font-medium">32%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                              <span className="text-sm">Project Feedback</span>
                            </div>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                              <span className="text-sm">Other</span>
                            </div>
                            <span className="text-sm font-medium">9%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">By Day of Week</span>
                        </div>
                        <div className="mt-2 grid grid-cols-1 gap-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Monday</span>
                            <div className="flex-1 mx-4">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className="h-2 bg-echopurple-500 rounded-full"
                                  style={{ width: "15%" }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Tuesday</span>
                            <div className="flex-1 mx-4">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className="h-2 bg-echopurple-500 rounded-full"
                                  style={{ width: "22%" }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">22%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Wednesday</span>
                            <div className="flex-1 mx-4">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className="h-2 bg-echopurple-500 rounded-full"
                                  style={{ width: "30%" }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">30%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Thursday</span>
                            <div className="flex-1 mx-4">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className="h-2 bg-echopurple-500 rounded-full"
                                  style={{ width: "18%" }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">18%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Friday</span>
                            <div className="flex-1 mx-4">
                              <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className="h-2 bg-echopurple-500 rounded-full"
                                  style={{ width: "15%" }}
                                ></div>
                              </div>
                            </div>
                            <span className="text-sm font-medium">15%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mentees">
            <Card>
              <CardHeader>
                <CardTitle>Mentee Progress</CardTitle>
                <CardDescription>Track your mentees' growth and achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left font-medium py-3 pl-4">Mentee</th>
                        <th className="text-left font-medium py-3">Role</th>
                        <th className="text-center font-medium py-3">Sessions</th>
                        <th className="text-center font-medium py-3">Goals</th>
                        <th className="text-right font-medium py-3 pr-4">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {menteeProgress.map((mentee) => (
                        <tr key={mentee.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-800">
                          <td className="py-4 pl-4">{mentee.name}</td>
                          <td className="py-4">{mentee.role}</td>
                          <td className="py-4 text-center">{mentee.sessionsCompleted}</td>
                          <td className="py-4 text-center">
                            {mentee.goalsAchieved}/{mentee.totalGoals}
                          </td>
                          <td className="py-4 pr-4">
                            <div className="flex items-center justify-end gap-2">
                              <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                  className={`h-2 rounded-full ${
                                    mentee.progress >= 75
                                      ? "bg-green-500"
                                      : mentee.progress >= 40
                                      ? "bg-yellow-500"
                                      : "bg-red-500"
                                  }`}
                                  style={{ width: `${mentee.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{mentee.progress}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-6 grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Progress Status</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            On Track
                          </Badge>
                          <span className="ml-2 text-sm">3 mentees</span>
                        </div>
                        <span className="text-sm font-medium">60%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                            Needs Attention
                          </Badge>
                          <span className="ml-2 text-sm">1 mentee</span>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            At Risk
                          </Badge>
                          <span className="ml-2 text-sm">1 mentee</span>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Goal Categories</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Technical Skills</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className="h-2 bg-blue-400 rounded-full"
                          style={{ width: "42%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm">Career Development</span>
                        <span className="text-sm font-medium">30%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className="h-2 bg-purple-400 rounded-full"
                          style={{ width: "30%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm">Soft Skills</span>
                        <span className="text-sm font-medium">18%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className="h-2 bg-green-400 rounded-full"
                          style={{ width: "18%" }}
                        ></div>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className="text-sm">Other</span>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <div
                          className="h-2 bg-yellow-400 rounded-full"
                          style={{ width: "10%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="feedback">
            <Card>
              <CardHeader>
                <CardTitle>Mentee Feedback</CardTitle>
                <CardDescription>Feedback received from your mentees</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3 mb-8">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-5xl font-bold text-echopurple-600 dark:text-echopurple-400">
                          {avgRating.toFixed(1)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Average Rating
                        </p>
                        <div className="flex justify-center mt-3">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`h-5 w-5 ${
                                i < Math.floor(avgRating) ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
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
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-5xl font-bold text-echopurple-600 dark:text-echopurple-400">
                          92%
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Positive Sentiment
                        </p>
                        <div className="flex justify-center mt-3">
                          <div className="w-24 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-green-400 rounded-full"
                              style={{ width: "92%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <h3 className="text-5xl font-bold text-echopurple-600 dark:text-echopurple-400">
                          85%
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                          Recommendation Rate
                        </p>
                        <div className="flex justify-center mt-3">
                          <div className="w-24 h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-blue-400 rounded-full"
                              style={{ width: "85%" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="space-y-8">
                  <div>
                    <h4 className="text-sm font-medium mb-4">Rating Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-10 text-right mr-2 text-sm">5 ★</div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-green-400 rounded-full"
                              style={{ width: "60%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-left ml-2 text-sm">60%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 text-right mr-2 text-sm">4 ★</div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-green-300 rounded-full"
                              style={{ width: "25%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-left ml-2 text-sm">25%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 text-right mr-2 text-sm">3 ★</div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-yellow-400 rounded-full"
                              style={{ width: "15%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-left ml-2 text-sm">15%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 text-right mr-2 text-sm">2 ★</div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-orange-400 rounded-full"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-left ml-2 text-sm">0%</div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 text-right mr-2 text-sm">1 ★</div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-200 rounded-full dark:bg-gray-700">
                            <div
                              className="h-3 bg-red-400 rounded-full"
                              style={{ width: "0%" }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-10 text-left ml-2 text-sm">0%</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-4">Recent Feedback</h4>
                    <div className="space-y-6">
                      {feedbackData.map((feedback) => (
                        <div key={feedback.id} className="bg-gray-50 p-4 rounded-lg dark:bg-gray-800">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{feedback.menteeName}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {feedback.date}
                            </div>
                          </div>
                          <div className="flex items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
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
                          <p className="text-sm">{feedback.comment}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MentorAnalytics;
