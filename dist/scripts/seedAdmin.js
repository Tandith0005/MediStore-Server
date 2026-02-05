"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const prisma_1 = require("../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
(0, dotenv_1.config)();
async function seedAdmin() {
    try {
        const ADMIN_NAME = process.env.ADMIN_NAME;
        const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
        if (!ADMIN_NAME) {
            throw new Error("Missing required env variable: ADMIN_NAME");
        }
        if (!ADMIN_EMAIL) {
            throw new Error("Missing required env variable: ADMIN_EMAIL");
        }
        if (!ADMIN_PASSWORD) {
            throw new Error("Missing required env variable: ADMIN_PASSWORD");
        }
        const email = ADMIN_EMAIL;
        const password = ADMIN_PASSWORD;
        //  Check existing user
        const existingUser = await prisma_1.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("Admin already exists");
        }
        // Create user
        const user = await prisma_1.prisma.user.create({
            data: {
                name: ADMIN_NAME,
                email,
                role: "ADMIN",
                emailVerified: true,
            },
        });
        //  Create account
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        await prisma_1.prisma.account.create({
            data: {
                id: crypto.randomUUID(),
                accountId: email,
                providerId: "email",
                userId: user.id,
                password: hashedPassword,
            },
        });
        console.log(" ADMIN SEEDED SUCCESSFULLY");
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await prisma_1.prisma.$disconnect();
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map