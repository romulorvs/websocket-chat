import preventActions from "prevent-action";
import { useEffect } from "react";
import { useGlobalState } from "../../store/store";
import { SVGSpinner } from "../../svg";
import { Container } from "./connection.styles";

let ws: WebSocket | undefined;
const WS_URL = "ws://localhost:3001";

const [ preventOnModal, restoreOnModal ] = preventActions();
const [ preventOnConnection, restoreOnConnection ] = preventActions();

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
          restoreOnConnection();
          
          if (user.id){
            sendRequest("auth_user", user);
          } else {
            preventOnModal("#page-content");
          }
        }

        if(message.type === "auth_user"){
          restoreOnModal();
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
    restoreOnModal();
    preventOnConnection();
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
    <Container>
      <h3>Connecting...</h3>
      {SVGSpinner}
    </Container>
  );
}

export default Connection;
