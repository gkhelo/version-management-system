import { User } from "./User";

export type Comment = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  version?: number;
  versionId: number;
  author: User;
  text: string;
  parentId?: number | null;
  replies: Comment[];
};
