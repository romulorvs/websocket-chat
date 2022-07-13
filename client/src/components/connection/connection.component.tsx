import { useEffect, useMemo } from "react";
import { useGlobalState } from "../../store/store";
import { SVGSpinner } from "../../svg";
import { blockActions } from "../../utils/preventAction";
import { Container } from "./connection.styles";

let ws: WebSocket | undefined;
const WS_URL = "ws://localhost:3001";

export const sendRequest = (type: string, data?: any) => {
  if (ws && ws.readyState === ws.OPEN) { 
    ws.send(JSON.stringify({ type, data, }));
  }
};

function Connection() {
  const { setMessages, setUsersTyping, user, isConnected, setIsConnected, actionsToPrevent } = useGlobalState();
  const { preventActions, restoreActions } = useMemo(() => blockActions(), []);

  const configConnection = () => {
    actionsToPrevent.preventOnModal?.restoreActions();
    preventActions();
    ws = new WebSocket(WS_URL);
  }

  if (ws) {
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);

      if (message.type === "connected") {
        setIsConnected(true);
        restoreActions();

        if (user.id){
          sendRequest("auth_user", user);
        } else {
          actionsToPrevent.preventOnModal?.preventActions();
        }
      }

      if(message.type === "auth_user"){
        actionsToPrevent.preventOnModal?.restoreActions();
        sendRequest("update_messages");
      }

      if (message.type === "update_messages") {
        setMessages(message.data);
      }

      if (message.type === "users_typing") {
        setUsersTyping(message.data);
      }
    };

    ws.onclose = () => {
      configConnection();
      setIsConnected(false);
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

  if (isConnected) {
    return null;
  }

  return (
    <Container>
      <h3>Connecting...</h3>
      {SVGSpinner}
    </Container>
  );
}

export default Connection;
