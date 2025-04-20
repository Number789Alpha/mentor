
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { format } from "date-fns";
import { getMentorAvailability, updateMentorAvailability } from "@/utils/api";
import BlockedDateManager from "@/components/schedule/BlockedDateManager";


interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DaySchedule {
  day: string;
  slots: TimeSlot[];
}

interface BlockedDate {
  date: string;
  reason: string;
}

interface MentorAvailabilityData {
  weeklySchedule: DaySchedule[];
  blockedDates: BlockedDate[];
  isAvailableForNewMentees: boolean;
  isAvailableForUrgent: boolean;
  bufferTime: string;
  maxDailySessions: string;
}

const DAYS_OF_WEEK = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
];

const MentorAvailability = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState<'weekly' | 'custom' | 'blocked'>('weekly');
  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([]);
  const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
  const [isAvailableForNewMentees, setIsAvailableForNewMentees] = useState<boolean>(true);
  const [isAvailableForUrgent, setIsAvailableForUrgent] = useState<boolean>(false);
  const [bufferTime, setBufferTime] = useState<string>('15');
  const [maxDailySessions, setMaxDailySessions] = useState<string>('3');

  
  useEffect(() => {
    const initializeSchedule = async () => {
      try {
        if (user?.id) {
          const availability = await getMentorAvailability(user.id);
          if (availability) {
            setWeeklySchedule(availability.weeklySchedule || generateEmptySchedule());
            setBlockedDates(availability.blockedDates || []);
            setIsAvailableForNewMentees(availability.isAvailableForNewMentees);
            setIsAvailableForUrgent(availability.isAvailableForUrgent);
            setBufferTime(availability.bufferTime || "15");
            setMaxDailySessions(availability.maxDailySessions || "3");
          }
        }
      } catch (error) {
        toast({
          title: "Error loading availability",
          description: "Failed to load your availability settings. Please try again.",
          variant: "destructive",
        });
      }
    };

    initializeSchedule();
  }, [user]);

  const generateEmptySchedule = (): DaySchedule[] => {
    return DAYS_OF_WEEK.map(day => ({
      day,
      slots: []
    }));
  };

  const handleSaveAvailability = async () => {
    try {
      if (!user?.id) {
        toast({
          title: "Authentication Error",
          description: "Please sign in to update your availability.",
          variant: "destructive",
        });
        return;
      }

      // Validate that there is at least one time slot
      const hasTimeSlots = weeklySchedule.some(day => day.slots.length > 0);
      if (!hasTimeSlots) {
        toast({
          title: "Validation Error",
          description: "Please add at least one time slot to your schedule.",
          variant: "destructive",
        });
        return;
      }

      // Validate time slots
      for (const day of weeklySchedule) {
        for (const slot of day.slots) {
          const start = new Date(`1970-01-01T${slot.startTime}`);
          const end = new Date(`1970-01-01T${slot.endTime}`);
          
          if (end <= start) {
            toast({
              title: "Invalid Time Slot",
              description: `End time must be after start time for ${day.day}`,
              variant: "destructive",
            });
            return;
          }

          // Check for minimum session duration (45 minutes)
          const duration = (end.getTime() - start.getTime()) / (1000 * 60);
          if (duration < 45) {
            toast({
              title: "Invalid Duration",
              description: `Session duration must be at least 45 minutes for ${day.day}`,
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
              description: `Sessions must be scheduled between 9 AM and 9 PM for ${day.day}`,
              variant: "destructive"
            });
            return;
          }
        }

        // Check for overlapping slots within the same day
        const sortedSlots = [...day.slots].sort((a, b) => 
          new Date(`1970-01-01T${a.startTime}`).getTime() - new Date(`1970-01-01T${b.startTime}`).getTime()
        );

        for (let i = 0; i < sortedSlots.length - 1; i++) {
          const currentSlot = sortedSlots[i];
          const nextSlot = sortedSlots[i + 1];
          const currentEnd = new Date(`1970-01-01T${currentSlot.endTime}`);
          const nextStart = new Date(`1970-01-01T${nextSlot.startTime}`);
          const bufferMs = parseInt(bufferTime) * 60 * 1000;

          if (new Date(currentEnd.getTime() + bufferMs) > nextStart) {
            toast({
              title: "Time Slot Overlap",
              description: `Please ensure at least ${bufferTime} minutes buffer between sessions for ${day.day}`,
              variant: "destructive"
            });
            return;
          }
        }
      }

      const availabilityData: MentorAvailabilityData = {
        weeklySchedule,
        blockedDates,
        isAvailableForNewMentees,
        isAvailableForUrgent,
        bufferTime,
        maxDailySessions
      };

      const result = await updateMentorAvailability(user.id, availabilityData);
      
      if (result) {
        toast({
          title: "Availability Updated",
          description: "Your availability settings have been saved successfully.",
        });
      } else {
        throw new Error('Failed to update availability');
      }
    } catch (error) {
      console.error('Error saving availability:', error);
      toast({
        title: "Error saving availability",
        description: "Failed to save your availability settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleAddTimeSlot = (dayIndex: number) => {
    const updatedSchedule = [...weeklySchedule];
    const day = updatedSchedule[dayIndex];
  
    // Validate against max daily sessions
    if (day.slots.length >= parseInt(maxDailySessions)) {
      toast({
        title: "Maximum Sessions Reached",
        description: `You can only add up to ${maxDailySessions} sessions per day.`,
        variant: "destructive"
      });
      return;
    }
  
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
  
      // Validate business hours
      const businessEnd = new Date(`1970-01-01T21:00`);
      if (newEndTime > businessEnd) {
        toast({
          title: "Outside Business Hours",
          description: "Cannot add more slots today as it would exceed business hours (9 AM to 9 PM).",
          variant: "destructive"
        });
        return;
      }
    }
  
    updatedSchedule[dayIndex].slots.push({
      startTime,
      endTime
    });
  
    setWeeklySchedule(updatedSchedule);
  };

  const handleRemoveTimeSlot = (dayIndex: number, slotIndex: number) => {
    const updatedSchedule = [...weeklySchedule];
    updatedSchedule[dayIndex].slots.splice(slotIndex, 1);
    setWeeklySchedule(updatedSchedule);
    toast({
      title: "Time Slot Removed",
      description: `Successfully removed time slot from ${updatedSchedule[dayIndex].day}.`,
    });
  };

  const handleUpdateTimeSlot = (dayIndex: number, slotIndex: number, field: 'startTime' | 'endTime', value: string) => {
    const updatedSchedule = [...weeklySchedule];
    const slot = updatedSchedule[dayIndex].slots[slotIndex];
    const day = updatedSchedule[dayIndex];
    
    // Validate time range
    const start = new Date(`1970-01-01T${field === 'startTime' ? value : slot.startTime}`);
    const end = new Date(`1970-01-01T${field === 'endTime' ? value : slot.endTime}`);
    
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

    // Check for overlapping slots
    const otherSlots = day.slots.filter((_, idx) => idx !== slotIndex);
    for (const otherSlot of otherSlots) {
      const otherStart = new Date(`1970-01-01T${otherSlot.startTime}`);
      const otherEnd = new Date(`1970-01-01T${otherSlot.endTime}`);
      const bufferMs = parseInt(bufferTime) * 60 * 1000;

      if (
        (start >= otherStart && start < new Date(otherEnd.getTime() + bufferMs)) ||
        (new Date(end.getTime() + bufferMs) > otherStart && end <= otherEnd) ||
        (start <= otherStart && end >= otherEnd)
      ) {
        toast({
          title: "Time Slot Overlap",
          description: `Please ensure at least ${bufferTime} minutes buffer between sessions for ${day.day}`,
          variant: "destructive"
        });
        return;
      }
    }

    updatedSchedule[dayIndex].slots[slotIndex][field] = value;
    updatedSchedule[dayIndex].slots.sort((a, b) => 
      new Date(`1970-01-01T${a.startTime}`).getTime() - new Date(`1970-01-01T${b.startTime}`).getTime()
    );
    setWeeklySchedule(updatedSchedule);
    
    toast({
      title: "Time Slot Updated",
      description: `Successfully updated time slot for ${day.day}.`,
    });
  };



  return (
    <DashboardLayout userType="mentor">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Availability</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your mentorship availability and schedule
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              View Your Calendar
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Availability Settings</CardTitle>
            <CardDescription>Control your overall availability status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Available for New Mentees</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Toggle this off if you're not accepting new mentees right now
                </p>
              </div>
              <Switch 
                id="new-mentees" 
                checked={isAvailableForNewMentees}
                onCheckedChange={setIsAvailableForNewMentees}
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  Crisis Support Availability
                  <Badge variant="destructive" className="animate-pulse bg-red-500">
                    URGENT
                  </Badge>
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Make yourself available for emergency/same-day Crisis support sessions
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Switch 
                  id="urgent-sessions" 
                  checked={isAvailableForUrgent}
                  onCheckedChange={setIsAvailableForUrgent}
                  className="data-[state=checked]:bg-emerald-500 data-[state=checked]:animate-pulse data-[state=checked]:ring-2 data-[state=checked]:ring-emerald-500/50"
                />
                <Label htmlFor="urgent-sessions" className={`text-sm font-medium ${isAvailableForUrgent ? 'text-emerald-500 animate-pulse font-bold' : ''}`}>
                  {isAvailableForUrgent ? 'ON CALL' : 'OFF DUTY'}
                </Label>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Session Buffer Time</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Minimum time between consecutive sessions
                </p>
              </div>
              <Select value={bufferTime} onValueChange={setBufferTime}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select buffer time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">No buffer</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Maximum Daily Sessions</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Limit the number of sessions per day
                </p>
              </div>
              <Select value={maxDailySessions} onValueChange={setMaxDailySessions}>
                <SelectTrigger className="w-40">
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
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as 'weekly' | 'custom' | 'blocked')}>
          <TabsList className="mb-6">
            <TabsTrigger value="weekly">Weekly Schedule</TabsTrigger>
            <TabsTrigger value="custom">Custom Dates</TabsTrigger>
            <TabsTrigger value="blocked">Blocked Dates</TabsTrigger>
          </TabsList>

          <TabsContent value="weekly">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Availability</CardTitle>
                <CardDescription>Set your recurring weekly availability</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {weeklySchedule.map((day, dayIndex) => (
                    <div key={day.day} className="flex items-start md:items-center flex-col md:flex-row border-b pb-4 last:border-0 last:pb-0">
                      <div className="w-32 font-medium">{day.day}</div>
                      <div className="flex-1 mt-2 md:mt-0">
                        {day.slots.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {day.slots.map((slot, index) => (
                              <Badge key={index} variant="outline" className="flex items-center gap-2 px-3 py-1">
                                <Clock className="h-3 w-3" />
                                <Select
                                  value={slot.startTime}
                                  onValueChange={(value) => handleUpdateTimeSlot(dayIndex, index, 'startTime', value)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue>{slot.startTime}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {TIME_SLOTS.map((time) => (
                                      <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <span>-</span>
                                <Select
                                  value={slot.endTime}
                                  onValueChange={(value) => handleUpdateTimeSlot(dayIndex, index, 'endTime', value)}
                                >
                                  <SelectTrigger className="w-24">
                                    <SelectValue>{slot.endTime}</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    {TIME_SLOTS.map((time) => (
                                      <SelectItem key={time} value={time}>{time}</SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <button 
                                  className="ml-1 text-gray-500 hover:text-red-500"
                                  onClick={() => handleRemoveTimeSlot(dayIndex, index)}
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </Badge>
                            ))}
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 gap-1"
                              onClick={() => handleAddTimeSlot(dayIndex)}
                            >
                              <Plus className="h-3.5 w-3.5" /> Add Slot
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400 mr-3">Not available</span>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="h-7 gap-1"
                              onClick={() => handleAddTimeSlot(dayIndex)}
                            >
                              <Plus className="h-3.5 w-3.5" /> Add Slot
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveAvailability}>Save Weekly Schedule</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="custom">
            <Card>
              <CardHeader>
                <CardTitle>Custom Availability</CardTitle>
                <CardDescription>Set availability for specific dates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12">
                  <Calendar className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">Calendar View Coming Soon</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1 text-center max-w-sm">
                    We're working on a calendar interface for setting custom availability. 
                    For now, please use the weekly schedule.
                  </p>
                  <Button className="mt-4">
                    Add Custom Date
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocked">
            <BlockedDateManager 
              blockedDates={blockedDates}
              onBlockedDatesChange={(newDates) => {
                setBlockedDates(newDates);
                handleSaveAvailability();
              }}
            />
          </TabsContent>
        </Tabs>
      </div>


    </DashboardLayout>
  );
};

export default MentorAvailability;

