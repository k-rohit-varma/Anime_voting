"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHallOfFame = exports.createVote = exports.createComment = exports.createAnime = exports.createContest = exports.adminLogout = exports.adminLogin = void 0;
const user_1 = __importDefault(require("../db/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../keys");
//flow  Contest-> anime(add to the contest)-> comment( userId, contestId, animeId)->vote(contestId, userId, animeId) --> after this the hall of fame creation
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).send("Need to enter all details");
            return;
        }
        const admin = yield user_1.default.admin.findFirst({
            where: {
                email: email,
                role: "ADMIN",
            },
        });
        yield user_1.default.admin.update({
            where: {
                id: admin === null || admin === void 0 ? void 0 : admin.id,
            },
            data: {
                isLoggedIn: true,
            },
        });
        if (!admin) {
            res.status(400).send("Email or password is worng");
            return;
        }
        const pass = admin === null || admin === void 0 ? void 0 : admin.password;
        if (pass !== password) {
            res.status(400).send("Email or password is wrong");
            return;
        }
        const token = jsonwebtoken_1.default.sign({ email }, keys_1.ADMIN_JWT_SECRET);
        console.log(`admin token ${token}`);
        res.cookie("admin_token", token);
        res.status(200).send(`Admin logged in successfully !!!`);
    }
    catch (err) {
        res.status(400).send(`something went worng`);
    }
});
exports.adminLogin = adminLogin;
const adminLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("admin_token", "");
    res.status(201).send(`admin logout successful !!!`);
});
exports.adminLogout = adminLogout;
// for contest creation we need the contest , anime and voting
const createContest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, duration } = req.body;
        const fourteenDaysLater = new Date(Date.now() + duration * 24 * 60 * 60 * 1000);
        // need contest description , duration , endtime
        const contest = yield user_1.default.contest.create({
            data: {
                description,
                duration,
                endTime: fourteenDaysLater,
            },
        });
        res.status(201).send(`contest created successfully with id ${contest.id}`);
    }
    catch (_a) {
        res.status(400).send(`Some thing gone wrong in create contest`);
    }
});
exports.createContest = createContest;
const createAnime = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, imageUrl, contestId } = req.body;
        if (!description || !imageUrl || !contestId) {
            res.status(400).send(`Some Thing went wrong with anime creation`);
            return;
        }
        const anime = yield user_1.default.anime.create({
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
    }
    catch (err) {
        res.status(400).send(`Some Thing went wrong with anime creation`);
    }
});
exports.createAnime = createAnime;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, contestId, animeId } = req.body;
        if (!userId || !contestId || animeId) {
            res.status(400).send(`Some Thing went wrong with comment creation`);
        }
        const commentSection = yield user_1.default.comment.create({
            data: {
                userId,
                contestId,
                animeId,
            },
        });
        res
            .status(201)
            .send(`comment created successfully with id ${commentSection.id}`);
    }
    catch (err) {
        res.status(400).send(`Some Thing went wrong with comment creation`);
    }
});
exports.createComment = createComment;
//sasuke beb8b426-96f5-426b-a99d-19f792c3facc
//naruto faddd24f-97ca-4ae3-8e6b-e6a10ecafb9d
const createVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { contestId, userId, animeId } = req.body;
        console.log("contest " +
            contestId +
            " user  " +
            " " +
            userId +
            " " +
            "for anime " +
            animeId);
        if (!userId || !contestId || !animeId) {
            res.status(400).send(`need all things went wrong with vote creation`);
            return;
        }
        const voting = yield user_1.default.vote.create({
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
    }
    catch (err) {
        res.status(400).send(`Some Thing went wrong with voting creation` + err);
    }
});
exports.createVote = createVote;
const createHallOfFame = (req, res) => {
    try {
        const { contestId, animeId } = req.body;
        //need to write logic for the anime which got highest vote
        res.send(`hall of fame creartion will depend on the votes for anime`);
    }
    catch (err) {
        res.status(400).send(`Some Thing went wrong with comment creation`);
    }
};
exports.createHallOfFame = createHallOfFame;
