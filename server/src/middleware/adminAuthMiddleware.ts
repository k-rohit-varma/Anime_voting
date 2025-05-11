import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_SECRET } from "../keys";

export const adminAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.admin_token;
    // console.log(`this is the token from admin middleware ${token}`);
    if (!token) {
      res.status(401).send(`you need to login first to open this page`);
      return;
    }
    const isValidToken = jwt.verify(token, ADMIN_JWT_SECRET);
    if (!isValidToken) {
      res.status(401).send(`You need to login first this is not a valid token`);
      return;
    }
    next();
  } catch (err) {
    res.status(500).send("some thing went worng in the middleware");
  }
};
