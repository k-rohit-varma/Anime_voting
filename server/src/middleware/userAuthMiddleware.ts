// import cookie from "cookie-parser"

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../keys";
import db from "../db/user";
import { User } from "@prisma/client";

export default interface JwtPayload {
  email: string;
  iat: string;
}

interface UserRequest extends Request {
  user: any;
}

export const userAuthMiddleware = (
  req: UserRequest,
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
    const isValidToken: any = jwt.verify(token, JWT_SECRET);
    const user = db.user.findFirst({
      where: {
        email: isValidToken.email,
      },
    });
    console.log("This is the middleware" + user);
    req.user = user; //extend this from the request
    next();
  } catch (err) {
    res.status(401).send("some thing went worng in the middleware");
  }
};
