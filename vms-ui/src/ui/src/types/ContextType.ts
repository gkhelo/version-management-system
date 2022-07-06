import { Dispatch } from "react";
import { User } from "./User";
import { SnackbarMessage } from "./SnackbarMessage";

export interface AppState {
  currentPage: string;
}

export interface PermissionState {
  permissions: string[];
}

export interface UserState {
  user: User | null;
}

export interface SnackbarState {
  message: SnackbarMessage | null;
}

export interface ActionInterface {
  type: string;
  payload?: any;
}

export type ActionsMapType = Record<
  string,
  (dispatch: Dispatch<ActionInterface>) => (...args: any[]) => void
>;

export type BoundActionType = Record<string, any>;
