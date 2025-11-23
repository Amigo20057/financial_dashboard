import { Request, Response, Router } from "express";
import { getDashboardByUserId } from "./dashboard.service";
import { authMiddleware } from "../../middleware/auth.middleware";

const router = Router();

router.get("/", authMiddleware, async (req: Request, res: Response) => {
  try {
    const dashboard = await getDashboardByUserId(req.user.id);
    res.status(200).json(dashboard);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res
      .status(500)
      .json({ message: "Get dashboard failed", error: message });
  }
});

export const dashBoardRouter = router;
