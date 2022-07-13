interface IUser {
  id: string;
  name: string;
}

interface IMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: number;
}

interface StateProps {
  user: IUser;
  messages: IMessage[];
  usersTyping: String[];
  isConnected: boolean;
}

export const INITIAL_STATE: StateProps = {
  user: { id: "", name: "" },
  messages: [],
  usersTyping: [],
  isConnected: false,
};

export type IState = typeof INITIAL_STATE & {
  setMessages: (newState: string) => void;
  setUser: (newState: IUser) => void;
  setUsersTyping: (newState: string[]) => void;
  setIsConnected: (newState: boolean) => void;
};
