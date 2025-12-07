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
    "SELECT * FROM public.dashboard WHERE user_id = $1",
    [userId]
  );
  return result.rows[0];
}

export async function updateBalanceDashboard(
  type: "income" | "expense",
  userId: string,
  amount: number
): Promise<void> {
  const dashboard = await getDashboardByUserId(userId);
  if (!dashboard) {
    throw new Error("Dashboard not found");
  }
  const newBalance =
    type === "income"
      ? Number(dashboard.balance) + Number(amount)
      : Number(dashboard.balance) - Number(amount);
  if (type === "income") {
    await pool.query("UPDATE public.dashboard SET balance = $1 WHERE id = $2", [
      newBalance,
      dashboard.id,
    ]);
  } else {
    await pool.query("UPDATE public.dashboard SET balance = $1 WHERE id = $2", [
      newBalance,
      dashboard.id,
    ]);
  }
}
