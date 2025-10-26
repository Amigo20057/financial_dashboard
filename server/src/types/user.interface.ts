import { IBase } from "./global.interface";

export interface IUser extends IBase {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export interface IRegister {
  fullName: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
