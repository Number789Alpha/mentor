
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, X } from "lucide-react";

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
}

interface Goal {
  id?: number;
  title: string;
  description: string;
  category: string;
  progress: number;
  startDate: Date;
  targetDate: Date;
  status: string;
  milestones: Milestone[];
}

interface CreateGoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (goal: Goal) => void;
  existingGoal?: Goal | null;
}

const categories = [
  "Education",
  "Career",
  "Portfolio",
  "Skill Development",
  "Personal",
  "Networking",
  "Industry Knowledge",
  "Interview Preparation",
];

const CreateGoalDialog = ({ open, onOpenChange, onSave, existingGoal }: CreateGoalDialogProps) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Education");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [targetDate, setTargetDate] = useState<Date>(new Date());
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");

  useEffect(() => {
    if (existingGoal) {
      setTitle(existingGoal.title);
      setDescription(existingGoal.description);
      setCategory(existingGoal.category);
      setStartDate(new Date(existingGoal.startDate));
      setTargetDate(new Date(existingGoal.targetDate));
      setMilestones(existingGoal.milestones);
    } else {
      resetForm();
    }
  }, [existingGoal, open]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("Education");
    setStartDate(new Date());
    setTargetDate(new Date(new Date().setMonth(new Date().getMonth() + 1)));
    setMilestones([]);
    setNewMilestone("");
  };

  const handleAddMilestone = () => {
    if (newMilestone.trim()) {
      const newId = milestones.length > 0 
        ? Math.max(...milestones.map(m => m.id)) + 1 
        : 1;
      setMilestones([...milestones, { id: newId, title: newMilestone.trim(), completed: false }]);
      setNewMilestone("");
    }
  };

  const handleRemoveMilestone = (id: number) => {
    setMilestones(milestones.filter(m => m.id !== id));
  };

  const handleSubmit = () => {
    if (!title.trim()) {
      alert("Please enter a goal title");
      return;
    }

    const goal: Goal = {
      id: existingGoal?.id,
      title,
      description,
      category,
      progress: existingGoal?.progress || 0,
      startDate,
      targetDate,
      status: existingGoal?.status || "not-started",
      milestones,
    };

    onSave(goal);
    if (!existingGoal) resetForm();
  };

  const formatDate = (date: Date | undefined) => {
    if (!date) return "";
    return format(date, "PPP");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{existingGoal ? "Edit Goal" : "Create New Goal"}</DialogTitle>
          <DialogDescription>
            {existingGoal 
              ? "Update the details of your existing goal" 
              : "Set a new goal to track your progress"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Goal Title</Label>
            <Input
              id="title"
              placeholder="Enter a clear, specific goal"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Add more details about your goal..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select defaultValue={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(startDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>Target Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formatDate(targetDate)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={targetDate}
                    onSelect={setTargetDate}
                    initialFocus
                    disabled={(date) => date < startDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label>Milestones</Label>
            <div className="space-y-3">
              {milestones.length > 0 && (
                <div className="space-y-2 border rounded-md p-3">
                  {milestones.map((milestone) => (
                    <div key={milestone.id} className="flex items-center justify-between">
                      <span className="text-sm">{milestone.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-destructive"
                        onClick={() => handleRemoveMilestone(milestone.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="flex gap-2">
                <Input
                  placeholder="Add a milestone..."
                  value={newMilestone}
                  onChange={(e) => setNewMilestone(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleAddMilestone();
                    }
                  }}
                  className="flex-1"
                />
                <Button type="button" onClick={handleAddMilestone}>
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              resetForm();
              onOpenChange(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            {existingGoal ? "Update Goal" : "Create Goal"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGoalDialog;
