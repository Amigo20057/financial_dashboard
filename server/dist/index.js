"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const pool_1 = require("./db/pool");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_controller_1 = require("./models/auth/auth.controller");
const user_controller_1 = require("./models/user/user.controller");
const port = process.env.APPLICATION_PORT;
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/auth", auth_controller_1.authRouter);
app.use("/users", user_controller_1.userRouter);
app.listen(port, (err) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, pool_1.initDB)();
    if (err) {
        console.error(err);
    }
    console.log(`SERVER IS RUNNING ON PORT ${port}`);
}));
