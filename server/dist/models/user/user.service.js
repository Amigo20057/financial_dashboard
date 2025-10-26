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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.createUser = createUser;
const pool_1 = require("../../db/pool");
function findUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool_1.pool.query("SELECT * FROM public.users WHERE email = $1", [email]);
        return result.rows[0] || null;
    });
}
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield pool_1.pool.query("SELECT * FROM public.users WHERE id = $1", [
            id,
        ]);
        return result.rows[0] || null;
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const [name, surname] = user.fullName.split(" ");
        const result = yield pool_1.pool.query("INSERT INTO public.users(name, surname, email, password) VALUES($1,$2,$3,$4)", [name, surname, user.email, user.password]);
        return result.rows[0];
    });
}
