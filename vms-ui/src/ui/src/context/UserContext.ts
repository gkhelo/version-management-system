import { Dispatch } from "react";
import createDataContext from "./createDataContext";
import { User } from "../types/User";
import { ActionInterface, UserState } from "../types/ContextType";

const userReducer = (state: UserState, action: ActionInterface): UserState => {
  switch (action.type) {
    case "set_user":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const setUser = (dispatch: Dispatch<ActionInterface>) => {
  return (user: User) => {
    dispatch({ type: "set_user", payload: user });
  };
};

export const { Context, Provider } = createDataContext(
  userReducer,
  { setUser },
  { user: null }
);
