import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createTransaction,
  getTransactions,
  getTransactionsByParams,
} from "./transaction.service";
import { TransactionParams } from "../../types/transaction.interface";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const data = req.body;
    data.userId = req.user.id;
    const transaction = await createTransaction(data);
    res.status(201).json(transaction);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Create transaction failed", error: message });
  }
});

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactions(req.user.id);
    res.status(200).json(transactions);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Get transactions failed", error: message });
  }
});

router.get("/params", authMiddleware, async (req: Request, res: Response) => {
  try {
    const transactions = await getTransactionsByParams(req.user.id, req.params);
    res.status(200).json(transactions);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Get transactions by params failed", error: message });
  }
});

export const transactionRouter = router;
