 import { Session, SessionStatus } from '@/types/session';

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

interface WeeklySchedule {
  weeklySchedule: DaySchedule[];
  maxDailySessions: number;
  bufferTime: number;
  isAvailableForUrgent: boolean;
}

interface RescheduleRequest {
  sessionId: string;
  newDate: string;
  newTime: string;
  reason: string;
}

interface FollowUpRequest {
  originalSessionId: string;
  date: string;
  time: string;
  topic: string;
}

export const scheduleService = {
  // Get mentor's weekly schedule
  async getMentorSchedule(mentorId: string): Promise<WeeklySchedule> {
    try {
      const response = await fetch(`/api/schedule/mentor/${mentorId}`);
      if (!response.ok) throw new Error('Failed to fetch mentor schedule');
      return await response.json();
    } catch (error) {
      console.error('Error fetching mentor schedule:', error);
      throw error;
    }
  },

  // Update mentor's weekly schedule
  async updateMentorSchedule(mentorId: string, schedule: WeeklySchedule): Promise<WeeklySchedule> {
    try {
      const response = await fetch(`/api/schedule/mentor/${mentorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
      });
      if (!response.ok) throw new Error('Failed to update mentor schedule');
      return await response.json();
    } catch (error) {
      console.error('Error updating mentor schedule:', error);
      throw error;
    }
  },

  // Reschedule a session
  async rescheduleSession(request: RescheduleRequest): Promise<Session> {
    try {
      const response = await fetch(`/api/sessions/${request.sessionId}/reschedule`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newDate: request.newDate,
          newTime: request.newTime,
          reason: request.reason
        })
      });
      if (!response.ok) throw new Error('Failed to reschedule session');
      return await response.json();
    } catch (error) {
      console.error('Error rescheduling session:', error);
      throw error;
    }
  },

  // Schedule a follow-up session
  async scheduleFollowUp(request: FollowUpRequest): Promise<Session> {
    try {
      const response = await fetch(`/api/sessions/follow-up`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
      });
      if (!response.ok) throw new Error('Failed to schedule follow-up session');
      return await response.json();
    } catch (error) {
      console.error('Error scheduling follow-up session:', error);
      throw error;
    }
  },

  // Get available time slots for a specific date
  async getAvailableSlots(mentorId: string, date: string): Promise<string[]> {
    try {
      const response = await fetch(`/api/schedule/mentor/${mentorId}/slots?date=${date}`);
      if (!response.ok) throw new Error('Failed to fetch available slots');
      return await response.json();
    } catch (error) {
      console.error('Error fetching available slots:', error);
      throw error;
    }
  },

  // Check if a mentor is available for urgent sessions
  async checkUrgentAvailability(mentorId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/schedule/mentor/${mentorId}/urgent-availability`);
      if (!response.ok) throw new Error('Failed to check urgent availability');
      return await response.json();
    } catch (error) {
      console.error('Error checking urgent availability:', error);
      throw error;
    }
  }
};