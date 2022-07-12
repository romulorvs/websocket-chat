import { v4 as uuid } from "uuid";
import { CustomWebSocket, Message, Messages, ConnectedUsers, Dbouncer  } from "./types";

export class MessageUseCases {

  constructor(
    private connection: CustomWebSocket,
    private connections: CustomWebSocket[],
    private message: Message,
    private usersTyping: Set<string>,
    private messages: Messages[],
    private connectedUsers: ConnectedUsers,
    private removeUsersTypingDebounce: Dbouncer
  ) {
    console.log(`--------\nuser "${connection.currentUserId}" requests "${message.type}"`);
    console.log("message ", message);
  }

  send(res: any, connection = this.connection) {
    console.log(`response to "${connection.currentUserId}" | response: `, res, "\n");
    connection.send(JSON.stringify(res));
  }

  updateUsersTyping() {
    this.connections.forEach((connection) => {
      const usersTypingClone = new Set(this.usersTyping);
      usersTypingClone.delete(connection.currentUserId);

      const userNames: String[] = [];
      usersTypingClone.forEach((userId) => {
        userNames.push(this.connectedUsers[userId].name);
      });

      const res = {
        type: "users_typing",
        data: userNames,
      };

      this.send(res, connection);
    });
  }

  updateMessagesUC(connection?: CustomWebSocket) {
    const res = {
      type: "update_messages",
      data: this.messages,
    }

    this.send(res, connection);
  }

  authorizeUserUC() {
    this.connection.currentUserId = this.message.data.id;
    this.connectedUsers[this.message.data.id] = this.message.data;
    this.updateMessagesUC();
  }

  handleUserTypingUC() {
    if (!this.connection.currentUserId) return;
    this.usersTyping.add(this.connection.currentUserId);
    this.removeUsersTypingDebounce(() => this.usersTyping.delete(this.connection.currentUserId), 5000);
    this.updateUsersTyping();
  }

  sendMessageUC() {
    if (!this.connection.currentUserId) return;

    this.messages.push({
      id: uuid(),
      userId: this.connection.currentUserId,
      userName: this.connectedUsers[this.connection.currentUserId].name,
      message: this.message.data,
      timestamp: Date.now(),
    });

    this.connections.forEach((connection) => {
      this.updateMessagesUC(connection);
    });

    this.usersTyping.delete(this.connection.currentUserId);
    this.updateUsersTyping();
  }
}
