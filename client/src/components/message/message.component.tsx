import { useGlobalState } from "../../store/store";
import { Container, Content } from "./message.styles";

interface MessageProps {
  id: string;
  name: string;
  message: string;
  timestamp: number;
  onBothSides?: boolean;
}

function Message({ id, name, message, timestamp, onBothSides }: MessageProps) {
  const { user } = useGlobalState();

  const date = new Date(timestamp).toLocaleString();

  return (
    <Container rightSide={user.id === id} onBothSides={onBothSides}>
      <div className="avatar">{name.charAt(0)}</div>
      <Content>
        <div>{message}</div>
        <p>
          {name} | {date}
        </p>
      </Content>
    </Container>
  );
}

export default Message;
