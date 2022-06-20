import { Dispatch } from "react";
import createDataContext from "./createDataContext";
import { ActionInterface, PermissionState } from "../types/ContextType";

const permissionsReducer = (
  state: PermissionState,
  action: ActionInterface,
): PermissionState => {
  switch (action.type) {
    case "set_permissions":
      return { ...state, permissions: action.payload };
    default:
      return state;
  }
};

const setPermissions = (dispatch: Dispatch<ActionInterface>) => {
  return (permissions: string[]) => {
    dispatch({ type: "set_permissions", payload: permissions });
  };
};

export const { Context, Provider } = createDataContext(
  permissionsReducer,
  { setPermissions },
  { permissions: [] },
);
