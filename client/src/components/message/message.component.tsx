import { useGlobalState } from "../../store/store";
import { Container, Content } from "./message.styles";

interface MessageProps {
  id?: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
  shrink?: boolean;
}

function Message({ userId, userName, message, timestamp, shrink }: MessageProps) {
  const { user } = useGlobalState();

  const date = new Date(timestamp).toLocaleString();

  return (
    <Container rightSide={user.id === userId} shrink={shrink}>
      <div className="avatar">{userName.charAt(0)}</div>
      <Content>
        <pre>{message}</pre>
        <p>
          {userName} | {date}
        </p>
      </Content>
    </Container>
  );
}

export default Message;
