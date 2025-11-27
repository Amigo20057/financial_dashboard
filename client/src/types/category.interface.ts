import type { RequestStatus } from "./global.interface";

export interface ICategory {
  id: number;
  name: string;
  color: string;
  amount: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CategoryState {
  value: ICategory | object;
  status: RequestStatus;
  error: string | null;
}
