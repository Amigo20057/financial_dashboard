import { pool } from "../../db/pool";
import {
  ITransaction,
  TransactionParams,
} from "../../types/transaction.interface";
import {
  findCategoryById,
  increaseAmountCategory,
} from "../category/category.service";
import { updateBalanceDashboard } from "../dashboard/dashboard.service";
import { findUserById } from "../user/user.service";

export async function createTransaction(data: {
  userId: string;
  categoryId?: number;
  type: "income" | "expense";
  description?: string;
  amount: number;
}): Promise<ITransaction> {
  const user = await findUserById(data.userId);
  if (!user) {
    throw new Error("User not found");
  }
  let created: ITransaction;
  if (data.type === "income") {
    const result = await pool.query(
      `INSERT INTO public.transactions (user_id, type, description, amount)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [user.id, data.type, data.description, data.amount]
    );
    created = result.rows[0];
    await updateBalanceDashboard("income", user.id, data.amount);
  } else {
    const category = await findCategoryById(data.categoryId!);
    if (!category) {
      throw new Error("Category not found");
    }
    await increaseAmountCategory(category.id, data.amount);
    const result = await pool.query(
      `INSERT INTO public.transactions (user_id, category_id, type, description, amount)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user.id, category.id, data.type, data.description, data.amount]
    );
    created = result.rows[0];
    await updateBalanceDashboard("expense", user.id, data.amount);
  }

  return created;
}

export async function getTransactions(userId: string): Promise<ITransaction[]> {
  const result = await pool.query(
    "SELECT * FROM public.transactions WHERE user_id = $1",
    [userId]
  );
  return result.rows;
}

export async function getTransactionsByParams(
  userId: string,
  params: Record<string, any>
) {
  const { lastDays } = params as TransactionParams;
  let query = "";
  if (lastDays) {
    query = `AND date >= NOW() - INTERVAL '${lastDays} days'`;
  }
  const result = await pool.query(
    `
      SELECT *
      FROM public.transactions
      WHERE user_id = $1
      ${query}
      ORDER BY date DESC
    `,
    [userId]
  );
  return result.rows;
}
