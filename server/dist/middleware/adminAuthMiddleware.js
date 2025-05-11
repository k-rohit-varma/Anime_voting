"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminAuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const keys_1 = require("../keys");
const adminAuthMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.admin_token;
        // console.log(`this is the token from admin middleware ${token}`);
        if (!token) {
            res.status(401).send(`you need to login first to open this page`);
            return;
        }
        const isValidToken = jsonwebtoken_1.default.verify(token, keys_1.ADMIN_JWT_SECRET);
        if (!isValidToken) {
            res.status(401).send(`You need to login first this is not a valid token`);
            return;
        }
        next();
    }
    catch (err) {
        res.status(500).send("some thing went worng in the middleware");
    }
};
exports.adminAuthMiddleware = adminAuthMiddleware;
