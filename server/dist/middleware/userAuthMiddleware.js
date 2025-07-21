"use strict";
// import cookie from "cookie-parser"
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../keys");
const user_1 = __importDefault(require("../db/user"));
const userAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log(`this is the token from middleware ${token}`);
        if (!token) {
            res.status(401).send(`you need to login first to open this page`);
            return;
        }
        const isValidToken = jsonwebtoken_1.default.verify(token, keys_1.JWT_SECRET);
        const user = user_1.default.user.findFirst({
            where: {
                email: isValidToken.email,
            },
        });
        console.log("This is the middleware" + user);
        req.user = user; //extend this from the request
        next();
    }
    catch (err) {
        res.status(401).send("some thing went worng in the middleware");
    }
};
exports.userAuthMiddleware = userAuthMiddleware;
