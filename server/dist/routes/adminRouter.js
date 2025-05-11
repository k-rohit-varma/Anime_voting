"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminContorller_1 = require("../controllers/adminContorller");
const adminAuthMiddleware_1 = require("../middleware/adminAuthMiddleware");
const router = express_1.default.Router();
router.post("/login", adminContorller_1.adminLogin);
router.post("/createContest", adminAuthMiddleware_1.adminAuthMiddleware, adminContorller_1.createContest);
router.post("/createAnime", adminAuthMiddleware_1.adminAuthMiddleware, adminContorller_1.createAnime);
router.post("/createComment", adminAuthMiddleware_1.adminAuthMiddleware, adminContorller_1.createComment);
router.post("/createVote", adminAuthMiddleware_1.adminAuthMiddleware, adminContorller_1.createVote);
router.post("/createHallOfFame", adminAuthMiddleware_1.adminAuthMiddleware, adminContorller_1.createHallOfFame);
exports.default = router;
