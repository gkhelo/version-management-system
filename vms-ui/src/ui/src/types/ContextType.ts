import { Dispatch } from "react";

export interface AppState {
  currentPage: string;
}

export interface PermissionState {
  permissions: string[];
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
