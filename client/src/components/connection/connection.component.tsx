import { useCallback, useEffect, useState } from "react";
import { useGlobalState } from "../../store/store";
import { Container } from "./connection.styles";

let ws: WebSocket | undefined;
const WS_URL = "ws://localhost:3001";

export const sendRequest = (type: string, data?: any) => {
  if (ws && ws.readyState === ws.OPEN) {
    ws.send(
      JSON.stringify({
        type,
        data,
      })
    );
  }
};

function Connection() {
  const { setMessages, setUsersTyping, user } = useGlobalState();

  const [connection, setConnection] = useState({
    hasConnection: false,
    lostConnection: false,
  });

  const configConnection = useCallback(() => {
    ws = new WebSocket(WS_URL);

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message.type === "connected") {
        setConnection({ hasConnection: true, lostConnection: false });
        if (user.id) {
          sendRequest("auth_user", user);
        }
      }

      if (message.type === "update_messages") {
        console.log("message.data", message.data);
        setMessages(message.data);
      }

      if (message.type === "users_typing") {
        setUsersTyping(message.data);
      }
    };

    ws.onclose = reconnect;
  }, []);

  const reconnect = useCallback(() => {
    if (connection.hasConnection) {
      setConnection({ ...connection, lostConnection: true });
    }

    configConnection();
  }, [connection]);

  useEffect(() => {
    configConnection();

    return () => {
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  if (connection.hasConnection && !connection.lostConnection) {
    return null;
  }

  if (connection.lostConnection) {
    return (
      <Container>
        Connection Lost!
        <br />
        Reconnecting..
      </Container>
    );
  }

  return <Container>connecting...</Container>;
}

export default Connection;
