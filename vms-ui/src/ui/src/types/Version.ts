import { Application } from "./Application";

export type Version = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  version?: number;
  description?: string | null;
  application?: Application;
  files?: [string]
};
