import { Dispatch } from "react";
import createDataContext from "./createDataContext";
import { ActionInterface, SnackbarState } from "../types/ContextType";
import { SnackbarMessage } from "../types/SnackbarMessage";

const appReducer = (
  state: SnackbarState,
  action: ActionInterface
): SnackbarState => {
  switch (action.type) {
    case "set_message":
      return { ...state, message: action.payload };
    default:
      return state;
  }
};

const setSnackbarMessage = (dispatch: Dispatch<ActionInterface>) => {
  return (error: SnackbarMessage) => {
    dispatch({ type: "set_message", payload: error });
  };
};

export const { Context, Provider } = createDataContext(
  appReducer,
  { setSnackbarMessage: setSnackbarMessage },
  { message: null }
);
