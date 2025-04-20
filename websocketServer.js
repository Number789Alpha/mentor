const WebSocket = require('ws');

class WebSocketServer {
  constructor(server) {
    this.wss = new WebSocket.Server({ server });
    this.sessions = new Map(); // sessionId -> Set of WebSocket connections
    this.setupWebSocketServer();
  }

  setupWebSocketServer() {
    this.wss.on('connection', (ws) => {
      console.log('New WebSocket connection established');

      ws.on('message', (message) => {
        try {
          const data = JSON.parse(message);
          this.handleMessage(ws, data);
        } catch (error) {
          console.error('Error handling WebSocket message:', error);
        }
      });

      ws.on('close', () => {
        this.handleDisconnect(ws);
      });

      ws.on('error', (error) => {
        console.error('WebSocket error:', error);
      });
    });
  }

  handleMessage(ws, message) {
    switch (message.type) {
      case 'subscribe':
        this.handleSubscribe(ws, message.sessionId);
        break;
      case 'unsubscribe':
        this.handleUnsubscribe(ws, message.sessionId);
        break;
      default:
        console.warn('Unknown message type:', message.type);
    }
  }

  handleSubscribe(ws, sessionId) {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, new Set());
    }
    this.sessions.get(sessionId).add(ws);
    ws.sessionSubscriptions = ws.sessionSubscriptions || new Set();
    ws.sessionSubscriptions.add(sessionId);
  }

  handleUnsubscribe(ws, sessionId) {
    if (this.sessions.has(sessionId)) {
      this.sessions.get(sessionId).delete(ws);
      if (this.sessions.get(sessionId).size === 0) {
        this.sessions.delete(sessionId);
      }
    }
    if (ws.sessionSubscriptions) {
      ws.sessionSubscriptions.delete(sessionId);
    }
  }

  handleDisconnect(ws) {
    if (ws.sessionSubscriptions) {
      for (const sessionId of ws.sessionSubscriptions) {
        this.handleUnsubscribe(ws, sessionId);
      }
    }
  }

  notifySessionUpdate(sessionId, eventType, sessionData) {
    if (this.sessions.has(sessionId)) {
      const message = JSON.stringify({
        type: eventType,
        session: sessionData
      });

      this.sessions.get(sessionId).forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    }
  }
}

module.exports = WebSocketServer;