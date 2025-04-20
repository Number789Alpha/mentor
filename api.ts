import axios from 'axios';
import { handleApiError } from './errorHandling';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001';

interface SessionData {
  mentorName: string;
  menteeName: string;
  mentorEmail?: string;
  menteeEmail?: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
  status?: string;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000, // 15 second timeout
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 500
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Network error or server not responding
      throw new Error('Unable to connect to server. Please check your internet connection.');
    }
    
    if (error.response.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken');
      window.location.href = '/signin';
    } else if (error.response.status === 403) {
      throw new Error('Access denied. Please check your permissions.');
    } else if (error.response.status === 404) {
      throw new Error('Resource not found.');
    } else if (error.response.status >= 500) {
      throw new Error('Server error. Please try again later.');
    }
    
    return Promise.reject(error);
  }
);

export const bookSession = async (sessionData: SessionData) => {
  try {
    // Validate required fields
    if (!sessionData.mentorName || !sessionData.menteeName || !sessionData.topic || !sessionData.date || !sessionData.time) {
      throw new Error('Missing required session information');
    }

    // Validate date and time
    const sessionDateTime = new Date(`${sessionData.date} ${sessionData.time}`);
    if (sessionDateTime < new Date()) {
      throw new Error('Cannot book sessions in the past');
    }

    // Add retry logic for network issues
    let retries = 3;
    let response;

    while (retries > 0) {
      try {
        response = await api.post('/api/sessions/book', sessionData);
        break;
      } catch (err) {
        if (retries === 1) throw err;
        retries--;
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    if (!response?.data) {
      throw new Error('Failed to book session: No response from server');
    }

    // Validate response data
    const { id, mentorId, status } = response.data;
    if (!id || !mentorId) {
      throw new Error('Invalid session data received from server');
    }

    return {
      ...response.data,
      status: status || 'upcoming'
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Session booking failed: ${error.message}`);
    }
    throw handleApiError(error);
  }
};

export const getMenteeSessions = async (menteeName: string) => {
  try {
    const response = await api.get(`/api/sessions/mentee/${menteeName}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMentorSessions = async (mentorName: string) => {
  try {
    const response = await api.get(`/api/sessions/mentor/${mentorName}`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateSessionStatus = async (sessionId: string, status: string) => {
  try {
    const response = await api.patch(`/api/sessions/${sessionId}/status`, { status });
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const getMentorAvailability = async (mentorId: string) => {
  try {
    const response = await api.get(`/api/mentors/${mentorId}/availability`);
    return response.data;
  } catch (error) {
    throw handleApiError(error);
  }
};

export const updateMentorAvailability = async (mentorId: string, availabilityData: any) => {
  try {
    // Validate input data
    if (!mentorId || !availabilityData) {
      throw new Error('Invalid input: mentorId and availabilityData are required');
    }

    // Validate schedule data structure
    if (!Array.isArray(availabilityData.weeklySchedule)) {
      throw new Error('Invalid schedule format: weeklySchedule must be an array');
    }

    // Make the API call
    const response = await api.patch(`/api/mentors/${mentorId}/availability`, availabilityData);
    
    if (!response.data) {
      throw new Error('No data received from server');
    }

    return response.data;
  } catch (error) {
    console.error('Error updating availability:', error);
    throw handleApiError(error);
  }
};