import { pool } from "../../db/pool";
import { findUserById } from "../user/user.service";

export async function createCategory(
  userId: string,
  name: string,
  color: string
) {
  const user = await findUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  const result = await pool.query(
    "INSERT INTO public.categories(name, color, user_id) VALUES($1,$2,$3) RETURNING *",
    [name, color, userId]
  );
  return result.rows[0];
}
