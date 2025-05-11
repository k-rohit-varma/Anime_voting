import { NextFunction, Request, Response } from "express";
import db from "../db/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { JWT_SECRET } from "../keys";

dotenv.config();
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

    res.status(201).send(`user created successfully` + `${newUser.id}`);
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
  res.status(200).send(`The Home page is opening and middleware is working`);
};

export const userLogout = async (req: Request, res: Response) => {
  res.cookie("token", "");
  res.status(201).send(`user logged out successfully !!`);
};
