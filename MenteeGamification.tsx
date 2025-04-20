import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trophy, Brain, Target, Users, ArrowRight, CheckCircle2, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Quiz {
  id: string;
  title: string;
  topic: string;
  difficulty: string;
  questionsCount: number;
  timeLimit: number;
  points: number;
}

interface LeaderboardEntry {
  rank: number;
  name: string;
  points: number;
  quizzesTaken: number;
  achievements: number;
}

const topics = [
  "All Topics",
  "Software Development",
  "Product Management",
  "UX Design",
  "Data Science",
  "Career Development",
  "Leadership",
];

const MenteeGamification = () => {
  const [activeTab, setActiveTab] = useState("quizzes");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const { toast } = useToast();

  // Sample quiz data
  const quizzes: Quiz[] = [
    {
      id: "1",
      title: "Software Architecture Fundamentals",
      topic: "Software Development",
      difficulty: "Intermediate",
      questionsCount: 15,
      timeLimit: 20,
      points: 100,
    },
    {
      id: "2",
      title: "Product Strategy Essentials",
      topic: "Product Management",
      difficulty: "Advanced",
      questionsCount: 20,
      timeLimit: 25,
      points: 150,
    },
    {
      id: "3",
      title: "UX Research Methods",
      topic: "UX Design",
      difficulty: "Beginner",
      questionsCount: 10,
      timeLimit: 15,
      points: 75,
    },
  ];

  // Sample leaderboard data
  const leaderboard: LeaderboardEntry[] = [
    {
      rank: 1,
      name: "Priya Sharma",
      points: 2500,
      quizzesTaken: 15,
      achievements: 8,
    },
    {
      rank: 2,
      name: "Rahul Verma",
      points: 2350,
      quizzesTaken: 12,
      achievements: 7,
    },
    {
      rank: 3,
      name: "Aisha Patel",
      points: 2200,
      quizzesTaken: 14,
      achievements: 6,
    },
  ];

  const userStats = {
    totalPoints: 1850,
    quizzesTaken: 10,
    achievements: 5,
    rank: 8,
    weeklyProgress: 75,
  };

  const handleStartQuiz = (quiz: Quiz) => {
    // In a real implementation, this would navigate to the quiz page
    toast({
      title: "Starting Quiz",
      description: `Preparing ${quiz.title}. Get ready!`,
    });
  };

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Learning Hub</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Challenge yourself with quizzes and track your progress
            </p>
          </div>
        </div>

        {/* User Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-500">Total Points</p>
                  <h3 className="text-2xl font-bold">{userStats.totalPoints}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-blue-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-500">Quizzes Taken</p>
                  <h3 className="text-2xl font-bold">{userStats.quizzesTaken}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-green-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-500">Achievements</p>
                  <h3 className="text-2xl font-bold">{userStats.achievements}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-purple-500" />
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-gray-500">Global Rank</p>
                  <h3 className="text-2xl font-bold">#{userStats.rank}</h3>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Progress</CardTitle>
            <CardDescription>Track your learning journey this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{userStats.weeklyProgress}%</span>
              </div>
              <Progress value={userStats.weeklyProgress} />
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="quizzes" value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="quizzes">Available Quizzes</TabsTrigger>
            <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="quizzes" className="space-y-4">
            <div className="flex justify-between items-center">
              <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select topic" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                      {topic}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {quizzes
                .filter(
                  (quiz) =>
                    selectedTopic === "All Topics" ||
                    quiz.topic === selectedTopic
                )
                .map((quiz) => (
                  <Card key={quiz.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{quiz.title}</CardTitle>
                      <CardDescription>{quiz.topic}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary">{quiz.difficulty}</Badge>
                          <span className="text-sm text-yellow-500 font-medium">
                            {quiz.points} points
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center">
                            <CheckCircle2 className="h-4 w-4 mr-1" />
                            {quiz.questionsCount} questions
                          </div>
                          <div className="flex items-center">
                            <Timer className="h-4 w-4 mr-1" />
                            {quiz.timeLimit} mins
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={() => handleStartQuiz(quiz)}
                        >
                          Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard">
            <Card>
              <CardHeader>
                <CardTitle>Global Leaderboard</CardTitle>
                <CardDescription>Top performers this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${entry.rank === 1
                            ? "bg-yellow-100 text-yellow-600"
                            : entry.rank === 2
                              ? "bg-gray-100 text-gray-600"
                              : "bg-orange-100 text-orange-600"
                            }`}
                        >
                          {entry.rank}
                        </div>
                        <div>
                          <p className="font-medium">{entry.name}</p>
                          <p className="text-sm text-gray-500">
                            {entry.quizzesTaken} quizzes • {entry.achievements} achievements
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-500">{entry.points}</p>
                        <p className="text-sm text-gray-500">points</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Your Achievements</CardTitle>
                <CardDescription>Milestones and badges you've earned</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium">Achievements Coming Soon</h3>
                  <p className="text-gray-500 mt-2">
                    We're working on an exciting achievement system. Stay tuned!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default MenteeGamification;