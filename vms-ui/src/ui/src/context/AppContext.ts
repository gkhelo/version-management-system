import { Dispatch } from "react";
import createDataContext from "./createDataContext";
import {
  ActionInterface,
  AppState,
} from "../types/ContextType";

const appReducer = (state: AppState, action: ActionInterface): AppState => {
  switch (action.type) {
    case "set_page":
      return { ...state, currentPage: action.payload };
    default:
      return state;
  }
};

const setCurrentPage = (dispatch: Dispatch<ActionInterface>) => {
  return (currentPage: String) => {
    dispatch({ type: "set_page", payload: currentPage });
  };
};

export const { Context, Provider } = createDataContext(
  appReducer,
  { setCurrentPage },
  { currentPage: "" }
);
