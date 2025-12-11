import type { IBase, RequestStatus } from "./global.interface";

export interface ITransaction extends IBase {
  user_id?: string;
  category_id?: string;
  type: "income" | "expense";
  description?: string;
  amount: string;
  date: string;
}

export interface IChartData {
  date: string;
  income: string;
  expenses: string;
}

export interface IGroupedData {
  timestamp: number;
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
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardState {
  value: IDashboard | object;
  status: RequestStatus;
  error: string | null;
}
