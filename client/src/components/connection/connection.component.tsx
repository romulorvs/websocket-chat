import { useEffect } from "react";
import { useGlobalState } from "../../store/store";
import { SVGSpinner } from "../../svg";
import { blockActions } from "../../utils/preventAction";
import { Container } from "./connection.styles";

let ws: WebSocket | undefined;
const WS_URL = "ws://localhost:3001";

const preventOnModal = blockActions();
const preventOnConnection = blockActions();

export const sendRequest = (type: string, data?: any) => {
  if (ws && ws.readyState === ws.OPEN) { 
    ws.send(JSON.stringify({ type, data, }));
  }
};

function Connection() {
  const { setMessages, setUsersTyping, user, isConnected, setIsConnected } = useGlobalState();

  const setWsEvents = () => {
    if (ws) {
      ws.onmessage = (evt) => {
        const message = JSON.parse(evt.data);

        if (message.type === "connected") {
          setIsConnected(true);
          preventOnConnection.restoreActions();
          
          if (user.id){
            sendRequest("auth_user", user);
          } else {
            preventOnModal.preventActions("#page-content");
          }
        }

        if(message.type === "auth_user"){
          preventOnModal.restoreActions();
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
  }

  const configConnection = () => {
    preventOnModal.restoreActions();
    preventOnConnection.preventActions();
    ws = new WebSocket(WS_URL);
    setWsEvents();
  }

  setWsEvents();

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
    <Container onDoubleClick={e => {}} onDrag={e => {}} onDrop={e => {}} onKeyDown={e => {}} onMouseDown={e => {}}>
      <h3>Connecting...</h3>
      {SVGSpinner}
    </Container>
  );
}

export default Connection;
