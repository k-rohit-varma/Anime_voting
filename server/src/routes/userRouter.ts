import express from "express";
import {
  home,
  userLogin,
  userLogout,
  userSignUp,
} from "../controllers/userController";
import { userAuthMiddleware } from "../middleware/userAuthMiddleware";

const router = express.Router();

router.post("/signup", userSignUp);
router.post("/login", userLogin);
router.post("/logout", userLogout);
router.get("/home", userAuthMiddleware, home);

export default router;
