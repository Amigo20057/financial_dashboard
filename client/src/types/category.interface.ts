import type { IBase, RequestStatus } from "./global.interface";

export interface ICategory extends IBase {
  name: string;
  color: string;
}

export interface CategoryState {
  value: ICategory | object;
  status: RequestStatus;
  error: string | null;
}
