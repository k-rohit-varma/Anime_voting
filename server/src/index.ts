import express, { Request, Response } from "express";
import dontenv from "dotenv";
import userRouter from "./routes/userRouter";

dontenv.config();
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/user", userRouter);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
