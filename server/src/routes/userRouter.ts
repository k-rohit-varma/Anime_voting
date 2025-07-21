import express from "express";
import {
  home,
  jwtAuth,
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
router.post("/auth",jwtAuth)
export default router;
