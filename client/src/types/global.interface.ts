import type { ICategory } from "./category.interface";
import type { IDashboard, ITransaction } from "./dashboard.interface";
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
  dashboard: IDashboard;
  dashboardStatus: RequestStatus;
  categories: ICategory[];
  categoriesStatus: RequestStatus;
  transactions?: ITransaction[];
  transactionStatus?: RequestStatus;
}
