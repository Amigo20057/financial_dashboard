import { IBase } from "./global.interface";

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
