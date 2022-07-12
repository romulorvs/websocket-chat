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

export const INITIAL_STATE: {
  user: IUser;
  messages: IMessage[];
  usersTyping: String[];
} = {
  user: {
    id: "",
    name: "",
  },
  messages: [],
  usersTyping: [],
};

export type IState = typeof INITIAL_STATE & {
  setMessages: (newState: string) => void;
  setUser: (newState: IUser) => void;
  setUsersTyping: (newState: string[]) => void;
};
