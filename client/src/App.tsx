import { useEffect, useMemo, useRef } from "react";
import { Container } from "./app.styles";
import { useGlobalState } from "./store/store";
import { Connection, Input, Message, Modal, sendRequest } from "./components";
import { blockActions } from "./utils/preventAction";

function App() {
  const pageContentRef = useRef<HTMLElement>(null)

  const { preventActions, restoreActions } = useMemo(() => blockActions(), []);
  const { user, messages, isConnected, actionsToPrevent, setActionsToPrevent } = useGlobalState();

  const hasMessagesOnBothSides = useMemo(() => {
    let hasUserId = false;
    let hasOtherUserId = false;

    for (let i = 0; i < messages.length; i++) {
      if (messages[i].userId === user.id) {
        hasUserId = true;
      } else {
        hasOtherUserId = true;
      }

      if (hasUserId && hasOtherUserId) {
        return true;
      }
    }

    return false;
  }, [messages]);

  useEffect(() => {
    if (user.id) {
      sendRequest("auth_user", user);
    }
  }, [user.id]);

  useEffect(() => {
    if (pageContentRef?.current) {
      setActionsToPrevent({
        ...actionsToPrevent,
        "preventOnModal": {
          preventActions: () => preventActions((pageContentRef.current as HTMLElement)),
          restoreActions
        }
      })
    }
  }, [])

  return (
    <>
      <Container ref={pageContentRef}>
        <div className="messages-container">
          {!messages.length && !!user.id && (
            <>
              <h2>Hello, {user.name}! 👋</h2>
              <h3>This place feels a little empty. Why not start typing?</h3>
            </>
          )}
          {messages.map(({ id, userId, userName, message, timestamp }) => (
            <Message
              key={id}
              userId={userId}
              userName={userName}
              message={message}
              timestamp={timestamp}
              shrink={hasMessagesOnBothSides}
            />
          ))}
        </div>
        <Input />
      </Container>
      {!user.id && isConnected && <Modal />}
      <Connection />
    </>
  );
}

export default App;
