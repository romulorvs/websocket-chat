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
  isConnected: boolean;
  pageContentRef?: React.RefObject<HTMLElement>;
} = {
  user: {
    id: "",
    name: "",
  },
  messages: [],
  usersTyping: [],
  isConnected: false,
  pageContentRef: undefined
};

export type IState = typeof INITIAL_STATE & {
  setMessages: (newState: string) => void;
  setUser: (newState: IUser) => void;
  setUsersTyping: (newState: string[]) => void;
  setIsConnected: (newState: boolean) => void;
  setPageContentRef: (newState: React.RefObject<HTMLElement>) => void;
};
