import express, { Request, Response } from "express";
import dontenv from "dotenv";
import userRouter from "./routes/userRouter";
import cookieparser from "cookie-parser";
import adminRouter from "./routes/adminRouter";
import cors from "cors";
import { CLIENT_URL } from "./keys";

dontenv.config();
const app = express();
const port = process.env.PORT;

app.use(cookieparser());
app.use(
  cors({
    origin: CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);
app.use("/api/v2/admin", adminRouter);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
