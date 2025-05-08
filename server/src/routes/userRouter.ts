import express from "express"
import { userSignUp } from "../controllers/userController"

const router = express.Router()

router.get("/signup",userSignUp)

export default router