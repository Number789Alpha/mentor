import { ApiError, handleApiError } from '@/utils/errorHandling';
import { Session, SessionFormat, SessionStatus, SessionType } from '@/types/session';
import { mockSessions, mockAvailability, MockSession, MentorAvailability } from './mockSessionData';
import { toast } from '@/hooks/use-toast';

interface SessionResponse extends Omit<Session, 'scheduledAt'> {
  error?: string;
  scheduledAt?: number;
  meetingLink: string;
  isFreeSession: boolean;
  mentorId: string;
  menteeId: string;
  mentorName: string;
  menteeName: string;
  date: string;
  time: string;
  duration: number;
  topic: string;
  type: SessionType;
  status: SessionStatus;
  notes?: string;
  sessionFormat: SessionFormat;
  rating?: number;
}

export interface SessionDetails extends Session {
  startTime: Date;
  endTime: Date;
  isFreeTrialSession: boolean;
}

export interface SessionFeedback {
  sessionId: string;
  userId: string;
  userRole: 'mentor' | 'mentee';
  rating: number;
  feedback: string;
  createdAt: Date;
}

export const sessionService = {
  async createSession(sessionData: Omit<Session, 'id'>): Promise<SessionResponse> {
    try {
      // Check network connectivity first
      try {
        await fetch(process.env.VITE_API_URL || window.location.origin);
      } catch (networkError) {
        return {
          ...sessionData,
          id: '',
          error: 'Please check your internet connection and try again.',
          meetingLink: '',
          isFreeSession: false,
          sessionFormat: 'online'
        };
      }
      // Validate required fields
      if (!sessionData.mentorId?.trim() || !sessionData.menteeId?.trim() || !sessionData.scheduledAt || !sessionData.type?.trim()) {
        throw new Error('Missing required session information: mentorId, menteeId, scheduledAt, and type are required');
      }

      // Validate scheduledAt is a valid future date and time
      const scheduledDate = new Date(sessionData.scheduledAt);
      const currentDate = new Date();
      
      // Ensure valid date
      if (isNaN(scheduledDate.getTime())) {
        throw new Error('Invalid date or time format');
      }

      // Compare dates without time
      const scheduledDateOnly = new Date(scheduledDate.getFullYear(), scheduledDate.getMonth(), scheduledDate.getDate());
      const currentDateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

      if (scheduledDateOnly < currentDateOnly) {
        throw new Error('Cannot schedule sessions for past dates');
      }

      // If same day, validate time
      if (scheduledDateOnly.getTime() === currentDateOnly.getTime()) {
        const scheduledTime = scheduledDate.getTime();
        const currentTime = currentDate.getTime();
        if (scheduledTime <= currentTime) {
          throw new Error('Cannot schedule sessions for past times');
        }
      }
      
      // Validate session type
      const validTypes: SessionType[] = ['technical', 'career', 'general', 'project', 'crisis'];
      if (!validTypes.includes(sessionData.type.toLowerCase() as SessionType)) {
        throw new Error(`Invalid session type. Must be one of: ${validTypes.join(', ')}`);
      }

      // Make API call to create session
      const response = await fetch(`${process.env.VITE_API_URL}/api/sessions/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...sessionData,
          meetingLink: sessionData.meetingLink || process.env.GOOGLE_MEET_LINK || 'https://meet.google.com/default-link'
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create session');
      }

      const createdSession = await response.json();
      let meetingLink = createdSession.meetingLink;
      
      // Validate and sanitize meeting link format
      try {
        const url = new URL(meetingLink);
        if (!url.protocol.startsWith('https:') || !url.hostname.includes('meet.google.com')) {
          throw new Error('Invalid meeting link format: must be a valid Google Meet URL');
        }
        meetingLink = url.toString(); // Normalize the URL
      } catch {
        throw new Error('Invalid meeting link format: must be a valid URL');
      }

      // Validate duration
      if (sessionData.duration && (sessionData.duration < 15 || sessionData.duration > 120)) {
        throw new Error('Session duration must be between 15 and 120 minutes');
      }

      const newSession: SessionResponse = {
        id: `session_${Date.now()}`,
        mentorId: sessionData.mentorId || '',
        menteeId: sessionData.menteeId,
        mentorName: sessionData.mentorName || 'Unknown Mentor',
        menteeName: sessionData.menteeName || 'Unknown Mentee',
        date: new Date(sessionData.scheduledAt || '').toISOString().split('T')[0],
        time: new Date(sessionData.scheduledAt || '').toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        duration: sessionData.duration || 30,
        topic: sessionData.topic || 'General Discussion',
        type: sessionData.type || 'general',
        status: 'upcoming',
        meetingLink,
        isFreeSession: sessionData.isFreeSession || false,
        notes: sessionData.notes,
        sessionFormat: sessionData.sessionFormat || 'video',
        rating: sessionData.rating,
        error: '',
        scheduledAt: sessionData.scheduledAt ? Number(sessionData.scheduledAt) : 0
      };

      // Add to mock sessions
      mockSessions.push(newSession);

      return newSession;
    } catch (error) {
      console.error('Error creating session:', error);
      throw handleApiError(error);
    }
  },
  async getUpcomingSessions(userId: string): Promise<SessionResponse[]> {
    try {
      return mockSessions.filter(session => 
        (session.mentorId === userId || session.menteeId === userId) &&
        session.status === 'upcoming'
      );
    } catch (error) {
      console.error('Error fetching upcoming sessions:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to load upcoming sessions. Please try again.'
      });
      return [];
    }
  },

  async joinSession(sessionId: string): Promise<SessionResponse> {
    try {
      // For demo purposes, always return a static session with Google Meet link
      const staticSession: SessionResponse = {
        id: sessionId,
        mentorId: 'demo-mentor',
        menteeId: 'demo-mentee',
        mentorName: 'Demo Mentor',
        menteeName: 'Demo Mentee',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }),
        duration: 60,
        topic: 'Demo Session',
        type: 'general',
        status: 'upcoming',
        meetingLink: 'https://meet.google.com/hek-awzw-dyr',
        isFreeSession: true,
        sessionFormat: 'video',
        scheduledAt: Date.now()
      };

      return staticSession;
    } catch (error) {
      console.error('Error joining session:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to join session';
      toast({
        variant: 'destructive',
        description: errorMessage
      });
      throw error;
    }
  },

  async updateMentorAvailability(mentorId: string, availability: MentorAvailability): Promise<boolean> {
    try {
      // Validate input data
      if (!mentorId || !availability) {
        throw new Error('Invalid input: mentorId and availability data are required');
      }

      // Validate schedule data structure
      if (!Array.isArray(availability.weeklySchedule)) {
        throw new Error('Invalid schedule format: weeklySchedule must be an array');
      }

      // Validate each day's schedule
      for (const day of availability.weeklySchedule) {
        if (!day.slots || !Array.isArray(day.slots)) {
          throw new Error(`Invalid slots format for ${day.day}`);
        }

        // Validate time slots
        for (const slot of day.slots) {
          if (!slot.startTime || !slot.endTime) {
            throw new Error(`Invalid time slot format for ${day.day}`);
          }
        }
      }

      // Make the API call
      const response = await fetch(`/api/mentors/${mentorId}/availability`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(availability)
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      toast({
        title: 'Success',
        description: 'Availability updated successfully'
      });
      return true;
    } catch (error) {
      console.error('Error updating availability:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update availability. Please try again.',
        variant: 'destructive'
      });
      return false;
    }
  },

  async getMentorAvailability(mentorId: string): Promise<MentorAvailability | null> {
    try {
      if (mentorId === mockAvailability.mentorId) {
        return mockAvailability;
      }
      throw new Error('Mentor not found');
    } catch (error) {
      console.error('Error fetching mentor availability:', error);
      toast({
        variant: 'destructive',
        description: 'Failed to load availability. Please try again.'
      });
      return null;
    }
  },
   async checkFreeTrialStatus(menteeId: string, mentorId: string): Promise<boolean> {
    try {
      const response = await fetch(`/api/sessions/free-trial-status?menteeId=${menteeId}&mentorId=${mentorId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (!response.ok) throw new Error('Failed to check free trial status');
      const data = await response.json();
      return data.hasFreeTrialAvailable;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async submitFeedback(feedback: Omit<SessionFeedback, 'createdAt'>): Promise<SessionFeedback> {
    try {
      const response = await fetch(`/api/sessions/${feedback.sessionId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(feedback),
      });

      if (!response.ok) throw new Error('Failed to submit feedback');
      return response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async getFeedback(sessionId: string): Promise<SessionFeedback[]> {
    try {
      const response = await fetch(`/api/sessions/${sessionId}/feedback`);
      if (!response.ok) throw new Error('Failed to get feedback');
      return response.json();
    } catch (error) {
      throw handleApiError(error);
    }
  },

  async createPaymentIntent({
    sessionId,
    mentorId,
    amount,
  }: {
    sessionId: string;
    mentorId: string;
    amount: number;
  }) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simulate success with 90% probability
    const isSuccess = Math.random() < 0.9;

    if (isSuccess) {
      return {
        success: true,
        paymentId: `mock_payment_${Date.now()}`,
        amount: amount,
        currency: 'USD',
        status: 'succeeded'
      };
    } else {
      throw handleApiError({ message: 'Payment failed: Please try again' });
    }
  },
};