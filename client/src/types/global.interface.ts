import type { IUser } from "./user.interface";

export interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface IContextMain {
  user: IUser;
  userStatus: RequestStatus;
}
