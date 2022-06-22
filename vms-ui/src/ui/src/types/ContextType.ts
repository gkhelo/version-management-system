import { Dispatch } from "react";
import { User } from "./User";
import { VMSError } from "./VMSError";

export interface AppState {
  currentPage: string;
}

export interface PermissionState {
  permissions: string[];
}

export interface UserState {
  user: User | null;
}

export interface ErrorState {
  error: VMSError | null;
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
