import type { IBase, RequestStatus } from "./global.interface";

export interface ITransaction extends IBase {
  user_id?: string;
  category_id?: string;
  type: "income" | "expense";
  description?: string;
}

export interface ITransactionState {
  value: ITransaction | object;
  status: RequestStatus;
  error: string | null;
}

export interface IDashboard {
  id: number;
  userId: string;
  balance: number;
  savingRate: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardState {
  value: IDashboard | object;
  status: RequestStatus;
  error: string | null;
}
