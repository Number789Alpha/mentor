
import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarClock, CheckCircle, Circle, Edit, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import CreateGoalDialog from "@/components/CreateGoalDialog";

// Sample data for goals
const goalsData = [
  {
    id: 1,
    title: "Complete Product Management Certification",
    description: "Finish the Google Product Management Professional Certificate on Coursera",
    category: "Education",
    progress: 75,
    startDate: new Date("2023-03-15"),
    targetDate: new Date("2023-06-15"),
    status: "in-progress",
    milestones: [
      { id: 1, title: "Complete Module 1: Introduction to Product Management", completed: true },
      { id: 2, title: "Complete Module 2: Product Strategy", completed: true },
      { id: 3, title: "Complete Module 3: Product Development Process", completed: true },
      { id: 4, title: "Complete Module 4: Product Launch", completed: false },
    ],
  },
  {
    id: 2,
    title: "Gain Interview Confidence",
    description: "Complete 10 mock interviews with feedback",
    category: "Career",
    progress: 30,
    startDate: new Date("2023-04-01"),
    targetDate: new Date("2023-07-01"),
    status: "in-progress",
    milestones: [
      { id: 1, title: "Complete 3 behavioral mock interviews", completed: true },
      { id: 2, title: "Complete 3 technical mock interviews", completed: false },
      { id: 3, title: "Complete 4 case study interviews", completed: false },
    ],
  },
  {
    id: 3,
    title: "Build Product Portfolio",
    description: "Create 3 case studies showcasing product management skills",
    category: "Portfolio",
    progress: 10,
    startDate: new Date("2023-05-01"),
    targetDate: new Date("2023-08-15"),
    status: "in-progress",
    milestones: [
      { id: 1, title: "Identify 3 projects for case studies", completed: true },
      { id: 2, title: "Complete first case study", completed: false },
      { id: 3, title: "Complete second case study", completed: false },
      { id: 4, title: "Complete third case study", completed: false },
    ],
  },
];

const MenteeGoals = () => {
  const [goals, setGoals] = useState(goalsData);
  const [showCreateGoal, setShowCreateGoal] = useState(false);
  const [currentTab, setCurrentTab] = useState("all");
  const [editingGoalId, setEditingGoalId] = useState<number | null>(null);

  const handleMilestoneToggle = (goalId: number, milestoneId: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => {
          if (milestone.id === milestoneId) {
            return { ...milestone, completed: !milestone.completed };
          }
          return milestone;
        });
        
        // Calculate new progress
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return { ...goal, milestones: updatedMilestones, progress };
      }
      return goal;
    }));
  };

  const handleCreateGoal = (newGoal) => {
    const maxId = Math.max(...goals.map(g => g.id));
    setGoals([...goals, { ...newGoal, id: maxId + 1 }]);
    setShowCreateGoal(false);
  };

  const handleEditGoal = (goalId: number) => {
    setEditingGoalId(goalId);
    setShowCreateGoal(true);
  };

  const handleUpdateGoal = (updatedGoal) => {
    setGoals(goals.map(goal => goal.id === updatedGoal.id ? updatedGoal : goal));
    setEditingGoalId(null);
    setShowCreateGoal(false);
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const getFilteredGoals = () => {
    switch (currentTab) {
      case "in-progress":
        return goals.filter(goal => goal.progress > 0 && goal.progress < 100);
      case "completed":
        return goals.filter(goal => goal.progress === 100);
      case "not-started":
        return goals.filter(goal => goal.progress === 0);
      default:
        return goals;
    }
  };

  const editingGoal = editingGoalId ? goals.find(g => g.id === editingGoalId) : null;

  return (
    <DashboardLayout userType="mentee">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Goals</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Track your progress towards your career and learning goals
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button onClick={() => {
              setEditingGoalId(null);
              setShowCreateGoal(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Create New Goal
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab}>
          <TabsList>
            <TabsTrigger value="all">All Goals</TabsTrigger>
            <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="not-started">Not Started</TabsTrigger>
          </TabsList>
          
          <TabsContent value={currentTab} className="mt-6">
            <div className="space-y-6">
              {getFilteredGoals().length > 0 ? (
                getFilteredGoals().map(goal => (
                  <Card key={goal.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="space-y-1">
                          <CardTitle className="text-xl flex items-center">
                            {goal.title}
                            <Badge 
                              variant="outline" 
                              className="ml-2 text-xs"
                            >
                              {goal.category}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {goal.description}
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0"
                            onClick={() => handleEditGoal(goal.id)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-destructive border-destructive"
                            onClick={() => handleDeleteGoal(goal.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="mt-4 space-y-2">
                        <div className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-500 dark:text-gray-400 gap-y-1 gap-x-4">
                          <div className="flex items-center">
                            <CalendarClock className="mr-1 h-4 w-4" />
                            <span>Start: {format(goal.startDate, "MMM d, yyyy")}</span>
                          </div>
                          <div className="flex items-center">
                            <CalendarClock className="mr-1 h-4 w-4" />
                            <span>Target: {format(goal.targetDate, "MMM d, yyyy")}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{goal.progress}%</span>
                        </div>
                        <Progress value={goal.progress} />
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <h4 className="text-sm font-medium mb-3">Milestones</h4>
                      <ul className="space-y-2">
                        {goal.milestones.map(milestone => (
                          <li 
                            key={milestone.id} 
                            className="flex items-start gap-2"
                            onClick={() => handleMilestoneToggle(goal.id, milestone.id)}
                          >
                            {milestone.completed ? (
                              <CheckCircle className="h-5 w-5 text-primary cursor-pointer mt-0.5" />
                            ) : (
                              <Circle className="h-5 w-5 text-gray-400 cursor-pointer mt-0.5" />
                            )}
                            <span className={`flex-1 ${milestone.completed ? 'line-through text-gray-500' : ''}`}>
                              {milestone.title}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="text-center py-12 border rounded-lg">
                  <h3 className="text-lg font-medium mb-2">No Goals Found</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {currentTab === "all" 
                      ? "You haven't created any goals yet." 
                      : `You don't have any ${currentTab.replace('-', ' ')} goals.`}
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setEditingGoalId(null);
                      setShowCreateGoal(true);
                    }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Goal
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <CreateGoalDialog
        open={showCreateGoal}
        onOpenChange={setShowCreateGoal}
        onSave={editingGoal ? handleUpdateGoal : handleCreateGoal}
        existingGoal={editingGoal}
      />
    </DashboardLayout>
  );
};

export default MenteeGoals;
