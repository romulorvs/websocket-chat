import { useCallback, useEffect, useState, useMemo } from "react";
import { getZIndex } from "../../app.styles";
import { useGlobalState } from "../../store/store";
import { SVGSpinner } from "../../svg";
import { blockActions } from "../../utils/preventAction";
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
  const { setMessages, setUsersTyping, user, isConnected, setIsConnected } = useGlobalState();
  const { preventActions, restoreActions } = useMemo(() => blockActions(), []);
  const [lostConnection, setLostConnection] = useState(false);

  const configConnection = useCallback(() => {
    preventActions({ zIndex: getZIndex("connection_modal_background") });
    ws = new WebSocket(WS_URL);

    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log('message ', message);

      if (message.type === "connected") {
        setLostConnection(false);
        setIsConnected(true);

        if (user.id) {
          sendRequest("auth_user", user);
        }

        restoreActions();
      }

      if (message.type === "update_messages") {
        setMessages(message.data);
      }

      if (message.type === "users_typing") {
        setUsersTyping(message.data);
      }
    };
  }, [isConnected, user.id]);

  if(ws){
    ws.onclose = () => {
      setLostConnection(true);
      configConnection();
    };
  }

  useEffect(() => {
    configConnection();

    return () => {
      if (ws) {
        ws.onclose = null;
        ws.close();
      }
    };
  }, []);

  if (isConnected && !lostConnection) {
    return null;
  }

  if(isConnected && lostConnection){
    return (
      <Container>
        <h2>Connection Lost!</h2>
        <h3>Reconnecting...</h3>
        {SVGSpinner}
      </Container>
    );
  }

  return <Container>{SVGSpinner}</Container>;
}

export default Connection;
