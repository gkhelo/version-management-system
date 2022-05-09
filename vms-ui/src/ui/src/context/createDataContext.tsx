import React, { Reducer, useReducer, ReactElement } from "react";
import {
  ActionInterface,
  ActionsMapType,
  BoundActionType,
} from "../types/ContextType";

const createDataContext = <DataState extends {}>(
  reducer: Reducer<DataState, ActionInterface>,
  actions: ActionsMapType,
  initialDataState: DataState
) => {
  type ContextValue<DataState> = {
    state: DataState;
  } & BoundActionType;

  const Context = React.createContext<ContextValue<DataState>>({
    state: initialDataState,
  } as ContextValue<DataState>);

  const Provider: React.FC<{ children: ReactElement }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialDataState);

    const boundActions = {} as BoundActionType;
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
