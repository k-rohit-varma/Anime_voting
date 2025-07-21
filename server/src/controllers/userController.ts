import { NextFunction, Request, Response } from "express";
import db from "../db/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "../keys";

dotenv.config();
interface userRequest extends Request {
  user: any;
}
export const userSignUp = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;

  try {
    if (!userName || !email || !password) {
      res.status(403).send(`User need to fill all the parameters to signup`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
        isLoggedIn: true,
        profile: {
          create: {
            description: "",
            imageUrl: "",
            streak: 0,
            votes: 0,
          },
        },
      },
    });
    const token = jwt.sign({ email }, JWT_SECRET);
    res.cookie("token", token);
    res.status(201).send({
      msg: `user created successfully`,
      user: newUser,
    });
  } catch (err) {
    res.status(500).send(`some thing went wrong in signup`);
  }
};

export const userLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(403).send(`Need to enter all details for login`);
      return;
    }
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    if (!user) {
      res.status(500).send(`Invalid username or password`);
      return;
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      res.status(500).send(`Invalid username or password`);
      return;
    }
    const jwtSecret = JWT_SECRET;
    const token = jwt.sign(
      {
        email,
      },
      jwtSecret
    );
    console.log(token);
    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isLoggedIn: true,
      },
    });
    res.cookie("token", token); //cookie has been set
    res.status(201).send({
      msg: `User logged in successfully`,
      user: user,
    });
  } catch (err) {
    res.status(500).send(`Error logging in user`);
  }
};

//this is just for sample testing of middleware
export const home = async (req: Request, res: Response) => {
  //need to get the user that is currently in the home from middleware module
  res.status(200).send(`The Home page is opening and middleware is working`);
};

export const userLogout = async (req: Request, res: Response) => {
  try {
    res.cookie("token", "");

    res.status(201).send(`user logged out successfully !!`);
  } catch (err) {
    console.log(`logout error`);
    res.status(501).send(`logout error`);
  }
};

export const jwtAuth = async (req: Request, res: Response) => {
  try {
    const token = await req.cookies.token;
    console.log("This is from jwtauth", token);
    if (!token) {
      res.status(401).send({
        msg: "no token",
      });
      return;
    }
    jwt.verify(token, JWT_SECRET);
    res.status(200).send({
      msg: "you can go",
    });
  } catch (err) {
    res.status(401).send(`something went wrong`);
  }
};
