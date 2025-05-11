// import cookie from "cookie-parser"

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../keys";

export const userAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log(`this is the token from middleware ${token}`);
    if (!token) {
      res.status(401).send(`you need to login first to open this page`);
      return;
    }
    const isValidToken = jwt.verify(token, JWT_SECRET);
    if (!isValidToken) {
      res.status(401).send(`You need to login first this is not a valid token`);
      return;
    }
    next();
  } catch (err) {
    res.status(500).send("some thing went worng in the middleware");
  }
};
