import { IBase } from "./global.interface";

export interface ICategories extends IBase {
  name: string;
  type: "income" | "expanse";
  color: string;
}

export interface ITransactions extends IBase {
  userId: string;
  categoryId: string;
  title: string;
  amount: number;
  type: "income" | "expanse";
  date: Date;
}

export interface IBudgets {
  id: number;
  userId: string;
  month: number;
  year: number;
  limitAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IDashboard {
  id: number;
  userId: string;
  balance: number;
  savingRate: number;
  createdAt: Date;
  updatedAt: Date;
}
