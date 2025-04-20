import { toast } from "@/hooks/use-toast";

interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

import { mockQuizzes, MockQuiz } from './mockQuizData';

interface Quiz extends MockQuiz {}

interface QuizResult {
  quizId: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  timeTaken: number;
  completedAt: string;
}

interface LeaderboardEntry {
  userId: string;
  name: string;
  points: number;
  quizzesTaken: number;
  achievements: number;
}

// In a real application, these would be API calls to your backend
class QuizService {
  private static instance: QuizService;
  private apiBaseUrl: string;

  private constructor() {
    this.apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
  }

  public static getInstance(): QuizService {
    if (!QuizService.instance) {
      QuizService.instance = new QuizService();
    }
    return QuizService.instance;
  }

  async getQuizzesByTopic(topic: string): Promise<Quiz[]> {
    try {
      // Filter mock quizzes by topic
      return mockQuizzes.filter(quiz => 
        quiz.topic.toLowerCase() === topic.toLowerCase() ||
        topic.toLowerCase() === 'all'
      );
    } catch (error) {
      console.error('Error fetching quizzes:', error);
      toast({
        variant: "destructive",
        description: "Failed to load quizzes. Please try again later.",
      });
      return [];
    }
  }

  async getQuizById(quizId: string): Promise<Quiz | null> {
    try {
      const quiz = mockQuizzes.find(q => q.id === quizId);
      if (!quiz) throw new Error('Quiz not found');
      return quiz;
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast({
        variant: "destructive",
        description: "Failed to load quiz. Please try again later.",
      });
      return null;
    }
  }

  async submitQuizResult(result: QuizResult): Promise<boolean> {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real implementation, this would save to a backend
      console.log('Quiz result submitted:', result);
      
      // Always return success for demo
      return true;
    } catch (error) {
      console.error('Error submitting quiz result:', error);
      toast({
        variant: "destructive",
        description: "Failed to submit quiz results. Please try again later.",
      });
      return false;
    }
  }

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/leaderboard`);
      if (!response.ok) throw new Error('Failed to fetch leaderboard');
      return await response.json();
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      toast({
        title: "Error",
        description: "Failed to load leaderboard. Please try again later.",
        variant: "destructive",
      });
      return [];
    }
  }

  async getUserStats(userId: string): Promise<{
    totalPoints: number;
    quizzesTaken: number;
    achievements: number;
    rank: number;
    weeklyProgress: number;
  }> {
    try {
      const response = await fetch(`${this.apiBaseUrl}/users/${userId}/stats`);
      if (!response.ok) throw new Error('Failed to fetch user stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user stats:', error);
      toast({
        title: "Error",
        description: "Failed to load your statistics. Please try again later.",
        variant: "destructive",
      });
      return {
        totalPoints: 0,
        quizzesTaken: 0,
        achievements: 0,
        rank: 0,
        weeklyProgress: 0,
      };
    }
  }
}

export const quizService = QuizService.getInstance();