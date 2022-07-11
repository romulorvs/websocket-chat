import { useEffect, useState } from "react";
import { useGlobalState } from "../../store/store";
import { Container } from "./connection.styles";

let ws: WebSocket | undefined;

function Connection() {
  const { setMessages } = useGlobalState();

  const [connection, setConnection] = useState({
    hasConnection: false,
    lostConnection: false,
  });

  useEffect(() => {
    ws = new WebSocket("ws://localhost:3001");

    ws.onmessage = evt => {
      const message = JSON.parse(evt.data);

      if(message.type === "connected"){
        setConnection({ ...connection, hasConnection: true });
        ws?.send(JSON.stringify({ type: "update_messages" }));
      }
      
      if(message.type === "update_messages"){
        setMessages(message.data);
      }
    };
  }, []);

  if (connection.hasConnection && !connection.lostConnection) {
    return null;
  }

  if (connection.lostConnection) {
    return (
      <Container>
        Connection Lost.
        <br />
        Trying to reconnect..
      </Container>
    );
  }

  return <Container>connecting...</Container>;
}

export default Connection;
