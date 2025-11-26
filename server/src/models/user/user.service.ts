import { pool } from "../../db/pool";
import { IRegister, IUser } from "../../types/user.interface";
import { createDashboard } from "../dashboard/dashboard.service";

export async function findUserByEmail(email: string): Promise<IUser | null> {
  const result = await pool.query(
    "SELECT * FROM public.users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
}

export async function findUserById(id: string): Promise<IUser | null> {
  const result = await pool.query("SELECT * FROM public.users WHERE id = $1", [
    id,
  ]);
  return result.rows[0] || null;
}

export async function createUser(user: IRegister): Promise<IUser> {
  const [name, surname] = user.fullName.split(" ");
  const result = await pool.query(
    "INSERT INTO public.users(name, surname, email, password) VALUES($1,$2,$3,$4) RETURNING *",
    [name, surname, user.email, user.password]
  );
  await createDashboard(result.rows[0].id);
  return result.rows[0];
}

export async function updateUser(
  id: string,
  updates: Partial<IUser>
): Promise<IUser | null> {
  const fields = Object.keys(updates);
  const values = Object.values(updates);

  if (fields.length === 0) return null;

  const setString = fields
    .map((field, index) => `${field} = $${index + 1}`)
    .join(", ");

  const query = `
    UPDATE public.users
    SET ${setString}
    WHERE id = $${fields.length + 1}
    RETURNING *
  `;

  const result = await pool.query(query, [...values, id]);

  return result.rows[0] || null;
}
