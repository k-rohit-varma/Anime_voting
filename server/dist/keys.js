"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_URL = exports.ADMIN_JWT_SECRET = exports.JWT_SECRET = void 0;
exports.JWT_SECRET = process.env.JWT_SECRET || "whothehellwasthat";
exports.ADMIN_JWT_SECRET = "whoareyou";
exports.CLIENT_URL = `http://localhost:5173`;
