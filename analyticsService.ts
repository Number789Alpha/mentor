import { Session } from '@/types/session';

export interface AnalyticsMetrics {
  totalSessions: number;
  completedSessions: number;
  canceledSessions: number;
  averageRating: number;
  totalMentees: number;
  sessionsByType: Record<string, number>;
  monthlySessionTrends: Array<{
    month: string;
    sessions: number;
  }>;
  topicDistribution: Array<{
    topic: string;
    count: number;
    percentage: number;
  }>;
}

export interface SessionAnalytics {
  date: string;
  count: number;
  type: string;
  status: string;
}

export const analyticsService = {
  async getMentorMetrics(mentorId: string): Promise<AnalyticsMetrics> {
    try {
      const response = await fetch(`/api/analytics/mentor/${mentorId}/metrics`);
      if (!response.ok) throw new Error('Failed to fetch mentor metrics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching mentor metrics:', error);
      throw error;
    }
  },

  async getSessionAnalytics(mentorId: string, timeframe: 'week' | 'month' | 'year'): Promise<SessionAnalytics[]> {
    try {
      const response = await fetch(`/api/analytics/mentor/${mentorId}/sessions?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch session analytics');
      return await response.json();
    } catch (error) {
      console.error('Error fetching session analytics:', error);
      throw error;
    }
  },

  async getMenteeProgress(menteeId: string): Promise<{
    goalsCompleted: number;
    skillsImproved: string[];
    sessionsAttended: number;
  }> {
    try {
      const response = await fetch(`/api/analytics/mentee/${menteeId}/progress`);
      if (!response.ok) throw new Error('Failed to fetch mentee progress');
      return await response.json();
    } catch (error) {
      console.error('Error fetching mentee progress:', error);
      throw error;
    }
  },

  calculateMetrics(sessions: Session[]): AnalyticsMetrics {
    const metrics: AnalyticsMetrics = {
      totalSessions: sessions.length,
      completedSessions: sessions.filter(s => s.status === 'completed').length,
      canceledSessions: sessions.filter(s => s.status === 'cancelled').length,
      averageRating: 0,
      totalMentees: new Set(sessions.map(s => s.menteeId)).size,
      sessionsByType: {},
      monthlySessionTrends: [],
      topicDistribution: []
    };

    // Calculate average rating
    const ratings = sessions.filter(s => s.rating).map(s => s.rating!);
    metrics.averageRating = ratings.length > 0 
      ? ratings.reduce((a, b) => a + b, 0) / ratings.length 
      : 0;

    // Calculate sessions by type
    sessions.forEach(session => {
      metrics.sessionsByType[session.type] = (metrics.sessionsByType[session.type] || 0) + 1;
    });

    // Calculate topic distribution
    const topicCounts: Record<string, number> = {};
    sessions.forEach(session => {
      topicCounts[session.topic] = (topicCounts[session.topic] || 0) + 1;
    });

    metrics.topicDistribution = Object.entries(topicCounts).map(([topic, count]) => ({
      topic,
      count,
      percentage: (count / sessions.length) * 100
    }));

    return metrics;
  }
};