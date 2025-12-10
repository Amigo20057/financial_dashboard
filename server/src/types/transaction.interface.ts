import { IBase } from "./global.interface";

export interface ITransaction extends IBase {
  user_id: string;
  category_id: string;
  type: "income" | "expense";
  description?: string;
}

export interface TransactionParams {
  lastDays: string;
}
