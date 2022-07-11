import { useMemo } from "react";
import { Container } from "./app.styles";
import { useGlobalState } from "./store/store";
import { Connection, Input, Message, Modal } from "./components";

function App() {
  const { user, messages } = useGlobalState();

  const messagesOnBothSides = useMemo(() => {
    let hasUserId = false;
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].id === user.id) {
        hasUserId = true;
      } else if (hasUserId) {
        return true;
      }
    }
    return false;
  }, [messages]);

  return (
    <>
      <Container>
        <div className="messages-container">
          {!messages.length && !!user.id && (
            <>
              <h2>Hello, {user.name}! 👋</h2>
              <h3>This place feels a little empty. Why not start typing?</h3>
            </>
          )}
          {messages.map(({ id, name, message, timestamp }) => (
            <Message
              key={id}
              id={id}
              name={name}
              message={message}
              timestamp={timestamp}
              onBothSides={messagesOnBothSides}
            />
          ))}
        </div>
        <Input />
      </Container>
      {!user.id && <Modal />}
      <Connection />
    </>
  );
}

export default App;
