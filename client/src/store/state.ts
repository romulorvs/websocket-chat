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

interface IPreventActions {
  [key: string]: {
    preventActions: (...args: any) => void;
    restoreActions: (...args: any) => void;
  };
}

interface StateProps {
  user: IUser;
  messages: IMessage[];
  usersTyping: String[];
  isConnected: boolean;
  actionsToPrevent: IPreventActions;
}

export const INITIAL_STATE: StateProps = {
  user: { id: "", name: "" },
  messages: [],
  usersTyping: [],
  isConnected: false,
  actionsToPrevent: {}
};

export type IState = typeof INITIAL_STATE & {
  setMessages: (newState: string) => void;
  setUser: (newState: IUser) => void;
  setUsersTyping: (newState: string[]) => void;
  setIsConnected: (newState: boolean) => void;
  setActionsToPrevent: (newState: IPreventActions) => void;
};
