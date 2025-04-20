export interface BaseSession {
  id: string;
  date: string;
  time: string;
  status: SessionStatus;
  topic?: string;
  sessionFormat?: 'video' | 'chat';
}

export interface Session extends BaseSession {
  mentorName: string;
  menteeName: string;
  menteeId: string;
  mentorId?: string;
  rating?: number;
  type: SessionType;
  duration?: number;
  notes?: string;
  scheduledAt?: string | number;
  meetingLink?: string;
  isFreeSession?: boolean;
}

export interface UpcomingSession extends BaseSession {
  mentor: string;
  mentorName?: string;
  image?: string;
}

export type SessionStatus = 'upcoming' | 'completed' | 'cancelled';

export type SessionFormat = 'video' | 'chat';

export type SessionType = 'technical' | 'career' | 'general' | 'project' | 'crisis';