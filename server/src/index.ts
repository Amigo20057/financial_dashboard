import express from "express";
import "dotenv/config";
import { initDB } from "./db/pool";
import cookieParser from "cookie-parser";
import { authRouter } from "./models/auth/auth.controller";
import { userRouter } from "./models/user/user.controller";

const port = process.env.APPLICATION_PORT;

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);

app.listen(port, async (err) => {
  await initDB();
  if (err) {
    console.error(err);
  }
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
