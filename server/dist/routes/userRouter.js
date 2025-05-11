"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userAuthMiddleware_1 = require("../middleware/userAuthMiddleware");
const router = express_1.default.Router();
router.post("/signup", userController_1.userSignUp);
router.post("/login", userController_1.userLogin);
router.post("/logout", userController_1.userLogout);
router.get("/home", userAuthMiddleware_1.userAuthMiddleware, userController_1.home);
exports.default = router;
