import create from "zustand";
import createContext from "zustand/context";
import { INITIAL_STATE, IState } from "./state";

const context = createContext();

const store = create((set) => {
  const newState: any = {};
  Object.keys(INITIAL_STATE).forEach((key) => {
    newState[key] = INITIAL_STATE[key as keyof typeof INITIAL_STATE];
    const setKey = key.charAt(0).toUpperCase() + key.slice(1);
    newState[`set${setKey}`] = (newState: any) => {
      set((currState) => ({ ...currState, [key]: newState }));
    };
  });
  return newState;
});

export const useGlobalState = () => {
  return context.useStore() as IState;
};

export const createStore = () => store;
export const Provider = context.Provider;
