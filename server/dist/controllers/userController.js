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
exports.userLogout = exports.home = exports.userLogin = exports.userSignUp = void 0;
const user_1 = __importDefault(require("../db/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const keys_1 = require("../keys");
dotenv_1.default.config();
const userSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, password } = req.body;
    try {
        if (!userName || !email || !password) {
            res.status(403).send(`User need to fill all the parameters to signup`);
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const newUser = yield user_1.default.user.create({
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
    }
    catch (err) {
        res.status(500).send(`some thing went wrong in signup`);
    }
});
exports.userSignUp = userSignUp;
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(403).send(`Need to enter all details for login`);
            return;
        }
        const user = yield user_1.default.user.findFirst({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(500).send(`Invalid username or password`);
            return;
        }
        const isValid = yield bcryptjs_1.default.compare(password, user.password);
        if (!isValid) {
            res.status(500).send(`Invalid username or password`);
            return;
        }
        const jwtSecret = keys_1.JWT_SECRET;
        const token = jsonwebtoken_1.default.sign({
            email,
        }, jwtSecret);
        console.log(token);
        res.cookie("token", token); //cookie has been set
        res.status(201).send({
            msg: `User logged in successfully`,
            user: user,
        });
    }
    catch (err) {
        res.status(500).send(`Error logging in user`);
    }
});
exports.userLogin = userLogin;
//this is just for sample testing of middleware
const home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).send(`The Home page is opening and middleware is working`);
});
exports.home = home;
const userLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("token", "");
    res.status(201).send(`user logged out successfully !!`);
});
exports.userLogout = userLogout;
