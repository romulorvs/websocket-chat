import dbouncer from "dbouncer";
import { WebSocket } from "ws";

export type Messages = {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
};

export type CustomWebSocket = WebSocket & { currentUserId: string };

export type Message = { type: string; data: any };

export type ConnectedUsers = {
  [key: string]: {
    id: string;
    name: string;
  };
};

export type Dbouncer = ReturnType<typeof dbouncer> & { clear: () => void };
