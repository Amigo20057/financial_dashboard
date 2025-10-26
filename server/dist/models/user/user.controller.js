"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const auth_middleware_1 = require("../../middleware/auth.middleware");
const user_service_1 = require("./user.service");
const router = (0, express_1.Router)();
router.get("/profile", auth_middleware_1.authMiddleware, (req, res) => {
    try {
        const user = (0, user_service_1.findUserById)(req.user.id);
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed get profile", error });
    }
});
exports.userRouter = router;
