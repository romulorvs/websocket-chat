import dbouncer from "dbouncer";
import { WebSocketServer } from "ws";
import { MessageUseCases } from "./messages.usecases";
import { CustomWebSocket, Messages, ConnectedUsers, Dbouncer } from "./types";

const wss = new WebSocketServer({ port: 3001 });
const usersTyping = new Set<string>();
const storedMessages: Messages[] = [];
const connections: Set<CustomWebSocket> = new Set<CustomWebSocket>();
const connectedUsers: ConnectedUsers = {};

wss.on("connection", (ws) => {
  const removeUsersTypingDebounce = dbouncer() as Dbouncer;

  const connection = ws as CustomWebSocket;
  connections.add(connection);

  connection.send(JSON.stringify({ type: "connected" }));
  console.log("--------\nnew user connected");

  connection.on("message", (data) => {
    const message = JSON.parse(data.toString());
    const messageUseCases = new MessageUseCases(
      connection, connections, message, usersTyping, storedMessages, connectedUsers, removeUsersTypingDebounce
    );
    return messageUseCases.execute();
  });

  connection.on("close", () => {
    console.log(`disconnecting user ${connection.currentUserId}`);
    delete connectedUsers[connection.currentUserId];
    connections.delete(connection);
  });
});
