// Mock session data for demonstration purposes

import { SessionStatus, SessionType } from "@/types/session";

export interface MockSession {
  id: string;
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
  meetingLink: string;
  isFreeSession: boolean;
}

export interface MentorAvailability {
  mentorId: string;
  weeklySchedule: {
    [key: string]: { // day of week
      slots: string[];
    };
  };
  bufferTime: number;
  maxDailySessions: number;
  isAvailableForUrgent: boolean;
}

export const mockSessions: MockSession[] = [
  {
    id: 'session-1',
    mentorId: 'mentor-1',
    menteeId: 'mentee-1',
    mentorName: 'John Doe',
    menteeName: 'Alice Smith',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: 60,
    topic: 'React Performance Optimization',
    type: 'technical',
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/hek-awzw-dyr',
    isFreeSession: false
  },
  {
    id: 'session-2',
    mentorId: 'mentor-1',
    menteeId: 'mentee-2',
    mentorName: 'John Doe',
    menteeName: 'Bob Johnson',
    date: '2024-02-16',
    time: '2:00 PM',
    duration: 45,
    topic: 'TypeScript Best Practices',
    type: 'technical',
    status: 'upcoming',
    meetingLink: 'https://meet.google.com/hek-awzw-dyr',
    isFreeSession: true
  }
];

export const mockAvailability: MentorAvailability = {
  mentorId: 'mentor-1',
  weeklySchedule: {
    'Monday': {
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
    },
    'Tuesday': {
      slots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    },
    'Wednesday': {
      slots: ['09:00 AM', '10:00 AM', '02:00 PM', '03:00 PM']
    },
    'Thursday': {
      slots: ['10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM']
    },
    'Friday': {
      slots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM']
    }
  },
  bufferTime: 15,
  maxDailySessions: 4,
  isAvailableForUrgent: true
};