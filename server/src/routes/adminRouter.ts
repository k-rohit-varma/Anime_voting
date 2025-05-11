import express from "express";
import {
  adminLogin,
  createAnime,
  createContest,
  createComment,
  createVote,
  createHallOfFame,
} from "../controllers/adminContorller";
import { adminAuthMiddleware } from "../middleware/adminAuthMiddleware";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/createContest", adminAuthMiddleware, createContest);
router.post("/createAnime", adminAuthMiddleware, createAnime);
router.post("/createComment", adminAuthMiddleware, createComment);
router.post("/createVote", adminAuthMiddleware, createVote);
router.post("/createHallOfFame", adminAuthMiddleware, createHallOfFame);

export default router;
