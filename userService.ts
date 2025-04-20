import { ApiError, handleApiError } from '@/utils/errorHandling';

export interface User {
  token?: string; // Make token optional since it's only added after login
  id: string;
  name: string;
  email: string;
  role: 'mentor' | 'mentee';
  profileImage?: string;
  specialties?: string[];
  mentorId?: string; // For mentees, references their assigned mentor
  menteeIds?: string[]; // For mentors, references their assigned mentees
}

export interface UserCredentials {
  email: string;
  password: string;
}

// Demo user accounts
const demoUsers: Record<string, User> = {
  'divyanshi@demo.com': {
    id: 'mentor_1',
    name: 'Divyanshi Agarwal',
    email: 'divyanshi@demo.com',
    role: 'mentor',
    specialties: ['Frontend Development', 'React', 'UI/UX'],
    menteeIds: ['mentee_1']
  },
  'aashika@demo.com': {
    id: 'mentee_1',
    name: 'Aashika Jain',
    email: 'aashika@demo.com',
    role: 'mentee',
    mentorId: 'mentor_1'
  },
  'priyank@demo.com': {
    id: 'mentor_2',
    name: 'Priyank Mishra',
    email: 'priyank@demo.com',
    role: 'mentor',
    specialties: ['Backend Development', 'System Design', 'Node.js'],
    menteeIds: ['mentee_2', 'mentee_3']
  },
  'karan@demo.com': {
    id: 'mentee_2',
    name: 'Karan Singh',
    email: 'karan@demo.com',
    role: 'mentee',
    mentorId: 'mentor_2'
  },
  'harsh@demo.com': {
    id: 'mentee_3',
    name: 'Harsh Shukla',
    email: 'harsh@demo.com',
    role: 'mentee',
    mentorId: 'mentor_2'
  }
};

// Demo credentials (password is 'demo123' for all users)
const demoCredentials: Record<string, string> = {
  'divyanshi@demo.com': 'demo123',
  'aashika@demo.com': 'demo123',
  'priyank@demo.com': 'demo123',
  'karan@demo.com': 'demo123',
  'harsh@demo.com': 'demo123'
};

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'mentor' | 'mentee';
  field?: string;
}

export const userService = {
  async register(data: RegisterData): Promise<User> {
    // For demo purposes, create a new user
    const userId = `${data.role}_${Date.now()}`;
    const newUser: User = {
      id: userId,
      name: data.name,
      email: data.email,
      role: data.role,
      token: `demo-token-${userId}`,
      specialties: data.field ? [data.field] : undefined
    };
    return newUser;
  },

  async login(credentials: UserCredentials): Promise<User> {
    // For demo purposes, check against demo credentials
    if (demoCredentials[credentials.email] === credentials.password) {
      const user = demoUsers[credentials.email];
      return {
        ...user,
        token: `demo-token-${user.id}`
      };
    }
    throw new Error('Invalid credentials');
  },

  async getUserById(userId: string): Promise<User | null> {
    // For demo purposes, find user in demo data
    const user = Object.values(demoUsers).find(u => u.id === userId);
    return user || null;
  },

  async getMentorMentees(mentorId: string): Promise<User[]> {
    // For demo purposes, filter mentees assigned to mentor
    const mentor = Object.values(demoUsers).find(u => u.id === mentorId);
    if (!mentor?.menteeIds) return [];
    return Object.values(demoUsers).filter(u => mentor.menteeIds?.includes(u.id));
  },

  async getMenteeMentor(menteeId: string): Promise<User | null> {
    // For demo purposes, find mentor assigned to mentee
    const mentee = Object.values(demoUsers).find(u => u.id === menteeId);
    if (!mentee?.mentorId) return null;
    return Object.values(demoUsers).find(u => u.id === mentee.mentorId) || null;
  }
};