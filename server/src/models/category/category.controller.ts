import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { createCategory } from "./category.service";

const router = Router();

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;

    if (!name || !color) {
      return res
        .status(400)
        .json({ message: "Invalid category name  or color" });
    }
    const userId = req.user.id;
    const category = await createCategory(userId, name, color);
    return res.status(201).json(category);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Failed to create category", error: message });
  }
});

export const categoryRouter = router;
