import { pool } from "../../db/pool";
import { IDashboard } from "../../types/dashboard.interface";

export async function createDashboard(userId: string): Promise<IDashboard> {
  const result = await pool.query(
    "INSERT INTO public.dashboard(user_id) VALUES($1)",
    [userId]
  );
  return result.rows[0];
}

export async function getDashboardByUserId(
  userId: string
): Promise<IDashboard> {
  const result = await pool.query(
    "SELECT * FROM public.users WHERE user_id = $1",
    [userId]
  );
  return result.rows[0];
}
