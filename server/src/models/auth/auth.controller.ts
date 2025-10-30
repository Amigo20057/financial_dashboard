import { Request, Response, Router } from "express";
import { login, register } from "./auth.service";

const router = Router();

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
  maxAge: 1000 * 60 * 60,
} as const;

router.post("/register", async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);
    res.cookie("token", user.token, cookieOptions);
    return res.status(201).json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: "Register failed", error: message });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    const user = await login(req.body);
    res.cookie("token", user.token, cookieOptions);
    return res.status(200).json(user);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: "Login failed", error: message });
  }
});

router.post("/logout", async (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return res.status(500).json({ message: "Logout failed", error: message });
  }
});

export const authRouter = router;
