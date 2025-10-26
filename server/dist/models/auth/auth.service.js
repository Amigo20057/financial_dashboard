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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = register;
exports.login = login;
const user_service_1 = require("../user/user.service");
const argon2_1 = require("argon2");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function generateToken(id, email) {
    return __awaiter(this, void 0, void 0, function* () {
        return jsonwebtoken_1.default.sign({ id, email }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });
    });
}
function register(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield (0, user_service_1.findUserByEmail)(data.email);
        if (userExists)
            throw new Error("User exists");
        data.password = yield (0, argon2_1.hash)(data.password);
        const newUser = yield (0, user_service_1.createUser)(data);
        const token = yield generateToken(newUser.id, data.email);
        const { password } = newUser, userWithoutPassword = __rest(newUser, ["password"]);
        return Object.assign(Object.assign({}, userWithoutPassword), { token });
    });
}
function login(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const userExists = yield (0, user_service_1.findUserByEmail)(data.email);
        if (!userExists)
            throw new Error("Wrong data");
        const validPassword = yield (0, argon2_1.verify)(data.password, userExists.password);
        if (!validPassword)
            throw new Error("Wrong data");
        const token = yield generateToken(userExists.id, userExists.email);
        const { password } = userExists, userWithoutPassword = __rest(userExists, ["password"]);
        return Object.assign(Object.assign({}, userWithoutPassword), { token });
    });
}
