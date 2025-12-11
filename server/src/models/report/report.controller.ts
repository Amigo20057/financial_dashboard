import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Get reports failed", error: message });
  }
});

router.post("/", authMiddleware, async (req: Request, res: Response) => {
  try {
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Get reports failed", error: message });
  }
});

export const reportRouter = router;
