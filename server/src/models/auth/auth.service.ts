import { ILogin, IRegister, IUser } from "../../types/user.interface";
import { createUser, findUserByEmail } from "../user/user.service";
import { hash, verify } from "argon2";
import jsonwebtoken from "jsonwebtoken";
import "dotenv/config";

async function generateToken(id: string, email: string): Promise<string> {
  return jsonwebtoken.sign({ id, email }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
}

export async function register(
  data: IRegister
): Promise<Omit<IUser, "password"> & { token: string }> {
  const userExists = await findUserByEmail(data.email);
  if (userExists) throw new Error("User exists");
  data.password = await hash(data.password);
  const newUser = await createUser(data);
  const token = await generateToken(newUser.id, data.email);
  const { password, ...userWithoutPassword } = newUser;
  return { ...userWithoutPassword, token };
}

export async function login(
  data: ILogin
): Promise<Omit<IUser, "password"> & { token: string }> {
  const userExists = await findUserByEmail(data.email);
  if (!userExists) throw new Error("Wrong data");
  const validPassword = await verify(userExists.password, data.password);
  if (!validPassword) throw new Error("Wrong data");
  const token = await generateToken(userExists.id, userExists.email);
  const { password, ...userWithoutPassword } = userExists;
  return { ...userWithoutPassword, token };
}
