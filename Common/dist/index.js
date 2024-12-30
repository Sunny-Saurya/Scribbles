"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatedBlogInput = exports.createdBlogInput = exports.signinInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    username: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }),
    password: zod_1.default.string().min(6, { message: "Password must be at least 6 characters" }),
    name: zod_1.default.string().optional()
});
exports.signinInput = zod_1.default.object({
    username: zod_1.default.string().min(3, { message: "Username must be at least 3 characters" }),
    password: zod_1.default.string().min(6, { message: "Password must be at least 6 characters" }),
});
exports.createdBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title must be at least of 3 characters" }),
    content: zod_1.default.string().min(3, { message: "Content must be at least of 3 characters " }),
});
exports.updatedBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(3, { message: "Title must be at least of 3 characters" }),
    content: zod_1.default.string().min(3, { message: "Content must be at least of 3 characters " }),
    id: zod_1.default.number()
});
