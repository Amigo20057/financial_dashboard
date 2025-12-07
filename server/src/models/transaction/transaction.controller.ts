import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { createTransaction } from "./transaction.service";

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

export const transactionRouter = router;
