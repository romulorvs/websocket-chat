interface IUser {
  id: string;
  name: string;
}

interface IMessage {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

export const INITIAL_STATE: {
  user: IUser;
  messages: IMessage[];
} = {
  user: {
    id: "",
    name: ""
  },
  messages: [],
};

export type IState = typeof INITIAL_STATE & {
  setMessages: (newState: string) => void;
  setUser: (newState: IUser) => void;
};
