export type User = {
  id?: number;
  createTime?: string | null;
  updateTime?: string | null;
  version?: number;
  username?: string | null;
  firstname?: string | null;
  lastname?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  passwordChangeRequired?: boolean;
  role?: Role | null;
};

export enum Role {
  ADMIN,
  USER,
}
