import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import WeeklyScheduleDialog from './WeeklyScheduleDialog';
import { format, setMinutes } from 'date-fns';

interface TimeSlot {
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
  isActive: boolean;
}

interface WeeklyScheduleManagerProps {
  initialSchedule?: DaySchedule[];
  onScheduleUpdate: (schedule: DaySchedule[]) => void;
}

const generateEmptySchedule = (): DaySchedule[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return days.map(day => ({
    day,
    slots: [],
    isActive: true
  }));
};

const WeeklyScheduleManager = ({ initialSchedule, onScheduleUpdate }: WeeklyScheduleManagerProps) => {
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>(initialSchedule || generateEmptySchedule());
  const [bufferTime, setBufferTime] = useState<string>("15");
  const [maxDailySessions, setMaxDailySessions] = useState<string>("3");
  const [isAvailableForUrgent, setIsAvailableForUrgent] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30",
    "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
    "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"
  ];

  const addTimeSlot = (dayIndex: number) => {
    const updatedSchedule = [...weeklySchedule];
    const day = updatedSchedule[dayIndex];

    // Find the first available time slot
    let startTime = "09:00";
    let endTime = "10:00";
    
    if (day.slots.length > 0) {
      const lastSlot = day.slots[day.slots.length - 1];
      const lastEndTime = new Date(`1970-01-01T${lastSlot.endTime}`);
      const bufferMinutes = parseInt(bufferTime);
      
      // Add buffer time to last slot's end time
      lastEndTime.setMinutes(lastEndTime.getMinutes() + bufferMinutes);
      startTime = format(lastEndTime, 'HH:mm');
      
      // Set end time 1 hour after start time
      const newEndTime = new Date(lastEndTime);
      newEndTime.setHours(newEndTime.getHours() + 1);
      endTime = format(newEndTime, 'HH:mm');
    }

    // Validate against max daily sessions
    if (day.slots.length >= parseInt(maxDailySessions)) {
      toast({
        title: "Maximum Sessions Reached",
        description: `You can only add up to ${maxDailySessions} sessions per day.`,
        variant: "destructive"
      });
      return;
    }

    updatedSchedule[dayIndex].slots.push({
      startTime,
      endTime,
      isAvailable: true
    });

    setWeeklySchedule(updatedSchedule);
    onScheduleUpdate(updatedSchedule);
  };

  const removeTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedSchedule = [...weeklySchedule];
    updatedSchedule[dayIndex].slots.splice(slotIndex, 1);
    setWeeklySchedule(updatedSchedule);
    onScheduleUpdate(updatedSchedule);
  };

  const updateTimeSlot = (dayIndex: number, slotIndex: number, field: keyof TimeSlot, value: string | boolean) => {
    const updatedSchedule = [...weeklySchedule];
    const slot = updatedSchedule[dayIndex].slots[slotIndex];
    
    if (field === 'startTime' || field === 'endTime') {
      const startTime = field === 'startTime' ? value as string : slot.startTime;
      const endTime = field === 'endTime' ? value as string : slot.endTime;
      
      // Convert times to comparable format
      const start = new Date(`1970-01-01T${startTime}`);
      const end = new Date(`1970-01-01T${endTime}`);
      
      // Validate time range
      if (end <= start) {
        toast({
          title: "Invalid Time Range",
          description: "End time must be after start time.",
          variant: "destructive"
        });
        return;
      }

      // Check for minimum session duration (45 minutes)
      const duration = (end.getTime() - start.getTime()) / (1000 * 60);
      if (duration < 45) {
        toast({
          title: "Invalid Duration",
          description: "Session duration must be at least 45 minutes.",
          variant: "destructive"
        });
        return;
      }

      // Validate business hours (9 AM to 9 PM)
      const businessStart = new Date(`1970-01-01T09:00`);
      const businessEnd = new Date(`1970-01-01T21:00`);
      if (start < businessStart || end > businessEnd) {
        toast({
          title: "Invalid Time",
          description: "Sessions must be scheduled between 9 AM and 9 PM.",
          variant: "destructive"
        });
        return;
      }
    }
    
    const newSlot = {
      ...slot,
      [field]: value
    };
    
    // Check for overlapping slots
    const slots = updatedSchedule[dayIndex].slots;
    const currentStart = new Date(`1970-01-01T${field === 'startTime' ? value as string : slot.startTime}`);
    const currentEnd = new Date(`1970-01-01T${field === 'endTime' ? value as string : slot.endTime}`);
    const bufferMs = parseInt(bufferTime) * 60 * 1000;

    // Sort slots by start time for better overlap checking
    const sortedSlots = slots
      .map((s, idx) => ({ ...s, index: idx }))
      .sort((a, b) => new Date(`1970-01-01T${a.startTime}`).getTime() - new Date(`1970-01-01T${b.startTime}`).getTime());

    for (let i = 0; i < sortedSlots.length; i++) {
      const otherSlot = sortedSlots[i];
      if (otherSlot.index !== slotIndex) {
        const otherStart = new Date(`1970-01-01T${otherSlot.startTime}`);
        const otherEnd = new Date(`1970-01-01T${otherSlot.endTime}`);
        
        // Check for buffer time overlap
        if (
          (currentStart >= otherStart && currentStart < new Date(otherEnd.getTime() + bufferMs)) ||
          (new Date(currentEnd.getTime() + bufferMs) > otherStart && currentEnd <= otherEnd) ||
          (currentStart <= otherStart && currentEnd >= otherEnd)
        ) {
          toast({
            title: "Time Slot Overlap",
            description: `Please ensure at least ${bufferTime} minutes buffer between sessions.`,
            variant: "destructive"
          });
          return;
        }
      }
    }
    
    // Update the slot and sort all slots by start time
    updatedSchedule[dayIndex].slots[slotIndex] = newSlot;
    updatedSchedule[dayIndex].slots.sort((a, b) => 
      new Date(`1970-01-01T${a.startTime}`).getTime() - new Date(`1970-01-01T${b.startTime}`).getTime()
    );

    setWeeklySchedule(updatedSchedule);
    onScheduleUpdate(updatedSchedule);
  };

  const toggleDayAvailability = (dayIndex: number) => {
    const updatedSchedule = [...weeklySchedule];
    updatedSchedule[dayIndex].isActive = !updatedSchedule[dayIndex].isActive;
    setWeeklySchedule(updatedSchedule);
    onScheduleUpdate(updatedSchedule);
  };

  const handleSave = () => {
    // Validate schedule
    for (const day of weeklySchedule) {
      if (day.isActive && day.slots.length === 0) {
        toast({
          title: "Invalid Schedule",
          description: `Please add at least one time slot for ${day.day} or disable the day.`,
          variant: "destructive"
        });
        return;
      }
    }

    setShowConfirmDialog(true);
  };

  const handleConfirmSave = () => {
    onScheduleUpdate(weeklySchedule);
    setShowConfirmDialog(false);
    toast({
      title: "Schedule Updated",
      description: "Your weekly schedule has been saved successfully."
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weekly Schedule</CardTitle>
        <CardDescription>Set your weekly availability for mentorship sessions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Switch
            id="urgent-sessions"
            checked={isAvailableForUrgent}
            onCheckedChange={setIsAvailableForUrgent}
          />
          <Label htmlFor="urgent-sessions" className={`text-sm font-medium ${isAvailableForUrgent ? 'text-green-500' : ''}`}>
            Available for urgent sessions
          </Label>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Session Buffer Time</Label>
            <Select value={bufferTime} onValueChange={setBufferTime}>
              <SelectTrigger>
                <SelectValue placeholder="Select buffer time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 minutes</SelectItem>
                <SelectItem value="30">30 minutes</SelectItem>
                <SelectItem value="45">45 minutes</SelectItem>
                <SelectItem value="60">60 minutes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Maximum Daily Sessions</Label>
            <Select value={maxDailySessions} onValueChange={setMaxDailySessions}>
              <SelectTrigger>
                <SelectValue placeholder="Select max sessions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 session</SelectItem>
                <SelectItem value="2">2 sessions</SelectItem>
                <SelectItem value="3">3 sessions</SelectItem>
                <SelectItem value="4">4 sessions</SelectItem>
                <SelectItem value="5">5 sessions</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-6">
          {weeklySchedule.map((day, dayIndex) => (
            <div key={day.day} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={day.isActive}
                    onCheckedChange={() => toggleDayAvailability(dayIndex)}
                  />
                  <Label className="font-medium">{day.day}</Label>
                </div>
                {day.isActive && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(dayIndex)}
                  >
                    Add Time Slot
                  </Button>
                )}
              </div>

              {day.isActive && day.slots.map((slot, slotIndex) => (
                <div key={slotIndex} className="flex items-center space-x-4">
                  <Select
                    value={slot.startTime}
                    onValueChange={(value) => updateTimeSlot(dayIndex, slotIndex, 'startTime', value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Start time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={slot.endTime}
                    onValueChange={(value) => updateTimeSlot(dayIndex, slotIndex, 'endTime', value)}
                  >
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="End time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeTimeSlot(dayIndex, slotIndex)}
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          ))}
        </div>

        <Button onClick={handleSave} className="w-full">
          Save Weekly Schedule
        </Button>
      </CardContent>

      <WeeklyScheduleDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        onConfirm={handleConfirmSave}
        scheduleDetails={{
          activeDays: weeklySchedule.filter(day => day.isActive).map(day => day.day),
          totalSlots: weeklySchedule.reduce((total, day) => total + day.slots.length, 0),
          bufferTime,
          maxDailySessions,
          isAvailableForUrgent
        }}
      />
    </Card>
  );
};

export default WeeklyScheduleManager;