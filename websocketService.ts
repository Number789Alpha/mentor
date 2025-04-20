import { Session } from '@/types/session';

type SessionUpdateCallback = (session: Session) => void;
type SessionEventType = 'created' | 'updated' | 'deleted';
type CrisisEventType = 'chat' | 'call';

interface SessionEvent {
  type: SessionEventType;
  session: Session;
}

interface CrisisEvent {
  type: CrisisEventType;
  timestamp: string;
  mentorName?: string;
}

class WebSocketService {
  emit(eventType: string, data: { mentorId: string; menteeId: string; sessionData: Session } | CrisisEvent) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        type: eventType,
        ...("sessionData" in data ? {
          mentorId: data.mentorId,
          menteeId: data.menteeId,
          sessionData: data.sessionData
        } : data)
      }));
    }
  }
  private ws: WebSocket | null = null;
  private sessionCallbacks: Map<string, SessionUpdateCallback[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000; // Start with 1 second delay

  constructor() {
    this.connect();
  }

  private connect() {
    const wsUrl = `${window.location.protocol === 'https:' ? 'wss:' : 'ws:'}//${window.location.host}/ws`;
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
      this.reconnectDelay = 1000;
    };

    this.ws.onmessage = (event) => {
      try {
        const sessionEvent: SessionEvent = JSON.parse(event.data);
        this.handleSessionEvent(sessionEvent);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
      this.attemptReconnect();
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      setTimeout(() => {
        console.log(`Attempting to reconnect (${this.reconnectAttempts + 1}/${this.maxReconnectAttempts})`);
        this.connect();
        this.reconnectAttempts++;
        this.reconnectDelay *= 2; // Exponential backoff
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  private handleSessionEvent(event: SessionEvent) {
    const callbacks = this.sessionCallbacks.get(event.session.id);
    if (callbacks) {
      callbacks.forEach(callback => callback(event.session));
    }
  }

  public subscribeToSession(sessionId: string, callback: SessionUpdateCallback) {
    if (!this.sessionCallbacks.has(sessionId)) {
      this.sessionCallbacks.set(sessionId, []);
    }
    this.sessionCallbacks.get(sessionId)?.push(callback);

    // Send subscription message to server
    this.sendMessage({
      type: 'subscribe',
      sessionId
    });
  }

  public unsubscribeFromSession(sessionId: string, callback: SessionUpdateCallback) {
    const callbacks = this.sessionCallbacks.get(sessionId);
    if (callbacks) {
      const index = callbacks.indexOf(callback);
      if (index !== -1) {
        callbacks.splice(index, 1);
      }
      if (callbacks.length === 0) {
        this.sessionCallbacks.delete(sessionId);
        // Send unsubscribe message to server
        this.sendMessage({
          type: 'unsubscribe',
          sessionId
        });
      }
    }
  }

  private sendMessage(message: any) {
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }
}

export const websocketService = new WebSocketService();