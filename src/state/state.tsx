import React, { createContext, useContext, useReducer } from "react";
import { Patient } from "../types";

import { Action } from "./reducer";

export type State = { // State is an object containing one key, 'patients'. the value of 'patients' is an object (aka dictionary data structure) with string keys. 
  patients: { [id: string]: Patient }; 
};

const initialState: State = {
  patients: {}
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>(
  [initialState, () => initialState]
);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = // StateProvider's return type is a react function component
({ reducer, children }: StateProviderProps) => { // (destructuredProps: typing)
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
// components that need state or the dispatch function (any component that access or updates state) use the useStateValue hook