import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import {
  createCategory,
  deleteCategory,
  findCategoriesByUserId,
  updateCategory,
} from "./category.service";

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

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const categories = await findCategoriesByUserId(req.user.id);
    return res.status(200).json(categories);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Failed to get categories", error: message });
  }
});

router.patch("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const updatedCategory = await updateCategory(+id, name, color);
    return res.status(200).json(updatedCategory);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Failed to update category", error: message });
  }
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteCategory(+id);
    return res.status(204).send({ success: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Failed to delete category", error: message });
  }
});

export const categoryRouter = router;
