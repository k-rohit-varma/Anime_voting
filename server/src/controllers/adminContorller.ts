import { Request, Response } from "express";
import db from "../db/user";
import jwt from "jsonwebtoken";
import { ADMIN_JWT_SECRET } from "../keys";

//flow  Contest-> anime(add to the contest)-> comment( userId, contestId, animeId)->vote(contestId, userId, animeId) --> after this the hall of fame creation

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).send("Need to enter all details");
      return;
    }
    const admin = await db.admin.findFirst({
      where: {
        email: email,
        role: "ADMIN",
      },
    });
    await db.admin.update({
      where: {
        id: admin?.id,
      },
      data: {
        isLoggedIn: true,
      },
    });
    if (!admin) {
      res.status(400).send("Email or password is worng");
      return;
    }
    const pass = admin?.password;
    if (pass !== password) {
      res.status(400).send("Email or password is wrong");
      return;
    }

    const token = jwt.sign({ email }, ADMIN_JWT_SECRET);
    console.log(`admin token ${token}`);
    res.cookie("admin_token", token);
    res.status(200).send(`Admin logged in successfully !!!`);
  } catch (err) {
    res.status(400).send(`something went worng`);
  }
};

export const adminLogout = async (req: Request, res: Response) => {
  res.cookie("admin_token", "");
  res.status(201).send(`admin logout successful !!!`);
};

// for contest creation we need the contest , anime and voting
export const createContest = async (req: Request, res: Response) => {
  try {
    const { description, duration } = req.body;

    const fourteenDaysLater = new Date(
      Date.now() + duration * 24 * 60 * 60 * 1000
    );

    // need contest description , duration , endtime
    const contest = await db.contest.create({
      data: {
        description,
        duration,
        endTime: fourteenDaysLater,
      },
    });

    res.status(201).send(`contest created successfully with id ${contest.id}`);
  } catch {
    res.status(400).send(`Some thing gone wrong in create contest`);
  }
};

export const createAnime = async (req: Request, res: Response) => {
  try {
    const { description, imageUrl, contestId } = req.body;
    if (!description || !imageUrl || !contestId) {
      res.status(400).send(`Some Thing went wrong with anime creation`);
      return;
    }
    const anime = await db.anime.create({
      data: {
        description,
        imageUrl,
        contest: {
          connect: {
            id: contestId,
          },
        },
      },
    });
    res.status(201).send(`anime created successfully with id ${anime.id}`);
  } catch (err) {
    res.status(400).send(`Some Thing went wrong with anime creation`);
  }
};

export const createComment = async (req: Request, res: Response) => {
  try {
    const { userId, contestId, animeId } = req.body;
    if (!userId || !contestId || animeId) {
      res.status(400).send(`Some Thing went wrong with comment creation`);
    }
    const commentSection = await db.comment.create({
      data: {
        userId,
        contestId,
        animeId,
      },
    });
    res
      .status(201)
      .send(`comment created successfully with id ${commentSection.id}`);
  } catch (err) {
    res.status(400).send(`Some Thing went wrong with comment creation`);
  }
};

//sasuke beb8b426-96f5-426b-a99d-19f792c3facc
//naruto faddd24f-97ca-4ae3-8e6b-e6a10ecafb9d

export const createVote = async (req: Request, res: Response) => {
  try {
    const { contestId, userId, animeId } = req.body;
    console.log(
      "contest " +
        contestId +
        " user  " +
        " " +
        userId +
        " " +
        "for anime " +
        animeId
    );
    if (!userId || !contestId || !animeId) {
      res.status(400).send(`need all things went wrong with vote creation`);
      return;
    }
    const voting = await db.vote.create({
      data: {
        voteTime: new Date(Date.now()),
        contest: {
          connect: {
            id: contestId,
          },
        },
        user: {
          connect: { id: userId },
        },
        anime: {
          connect: { id: animeId },
        },
      },
    });
    res.status(201).send(`voting created successfully with id ${voting.id}`);
  } catch (err) {
    res.status(400).send(`Some Thing went wrong with voting creation` + err);
  }
};

export const createHallOfFame = (req: Request, res: Response) => {
  try {
    const { contestId, animeId } = req.body;

    //need to write logic for the anime which got highest vote

    res.send(`hall of fame creartion will depend on the votes for anime`);
  } catch (err) {
    res.status(400).send(`Some Thing went wrong with comment creation`);
  }
};
