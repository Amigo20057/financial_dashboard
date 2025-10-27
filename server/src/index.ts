import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { initDB } from "./db/pool";
import cookieParser from "cookie-parser";
import { authRouter } from "./models/auth/auth.controller";
import { userRouter } from "./models/user/user.controller";
import cors from "cors";

const port = process.env.APPLICATION_PORT;

const app = express();
app.use(
  cors({
    origin: [process.env.CLIENT_URL!],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  next();
});

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(port, async (err) => {
  await initDB();
  if (err) {
    console.error(err);
  }
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
