import type { ICategory } from "./category.interface";
import type { IDashboard } from "./dashboard.interface";
import type { IUser } from "./user.interface";

export interface IBase {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";

export interface IContextMain {
  user: IUser;
  dashboard: IDashboard;
  dashboardStatus: RequestStatus;
  userStatus: RequestStatus;
  categoriesStatus: RequestStatus;
  categories: ICategory[];
}
