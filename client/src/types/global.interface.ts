export interface IBase {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type RequestStatus = "idle" | "loading" | "succeeded" | "failed";
