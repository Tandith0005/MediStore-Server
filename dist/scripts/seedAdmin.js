import { config } from "dotenv";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
config();
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
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new Error("Admin already exists");
        }
        // Create user
        const user = await prisma.user.create({
            data: {
                name: ADMIN_NAME,
                email,
                role: "ADMIN",
                emailVerified: true,
            },
        });
        //  Create account
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.account.create({
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
        await prisma.$disconnect();
    }
}
seedAdmin();
//# sourceMappingURL=seedAdmin.js.map