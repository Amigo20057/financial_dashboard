import { Request, Response, Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { findUserById } from "./user.service";

const router = Router();

router.get("/profile", authMiddleware, async (req: Request, res: Response) => {
  try {
    const user = await findUserById(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed get profile", error });
  }
});

export const userRouter = router;
