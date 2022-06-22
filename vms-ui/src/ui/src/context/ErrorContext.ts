import { Dispatch } from "react";
import createDataContext from "./createDataContext";
import { ActionInterface, ErrorState } from "../types/ContextType";
import { VMSError } from "../types/VMSError";

const appReducer = (state: ErrorState, action: ActionInterface): ErrorState => {
  switch (action.type) {
    case "set_error":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const setError = (dispatch: Dispatch<ActionInterface>) => {
  return (error: VMSError) => {
    dispatch({ type: "set_error", payload: error });
  };
};

export const { Context, Provider } = createDataContext(
  appReducer,
  { setError },
  { error: null }
);
