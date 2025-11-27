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

export async function findCategoriesByUserId(userId: string) {
  const result = await pool.query(
    "SELECT * FROM public.categories WHERE user_id = $1",
    [userId]
  );
  return result.rows;
}

export async function updateCategory(id: number, name: string, color: string) {
  const result = await pool.query(
    "UPDATE public.categories SET name = $1, color = $2 WHERE id = $3 RETURNING *",
    [name, color, id]
  );
  return result.rows[0];
}

export async function deleteCategory(id: number) {
  await pool.query("DELETE FROM public.categories WHERE id = $1", [id]);
}
