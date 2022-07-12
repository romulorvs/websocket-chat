import dbouncer from "dbouncer";
import { WebSocketServer } from "ws";
import { MessageUseCases } from "./messages.usecases";
import { CustomWebSocket, Messages, ConnectedUsers, Dbouncer } from "./types";

const wss = new WebSocketServer({ port: 3001 });
const usersTyping = new Set<string>();
const connections: CustomWebSocket[] = [];
const messages: Messages[] = [];
const connectedUsers: ConnectedUsers = {};

wss.on("connection", (ws) => {
  const removeUsersTypingDebounce = dbouncer() as Dbouncer;

  const connection = ws as CustomWebSocket;
  connections.push(connection);

  connection.send(JSON.stringify({ type: "connected" }));
  console.log("--------\nnew user connected");

  connection.on("message", (data) => {
    const message = JSON.parse(data.toString());
    const messageUseCases = new MessageUseCases(
      connection, connections, message, usersTyping, messages, connectedUsers, removeUsersTypingDebounce
    );

    if (message.type === "update_messages") return messageUseCases.updateMessagesUC();
    if (message.type === "user_typing") return messageUseCases.handleUserTypingUC();
    if (message.type === "send_message") return messageUseCases.sendMessageUC();
    if (message.type === "auth_user") return messageUseCases.authorizeUserUC();
  });
});
