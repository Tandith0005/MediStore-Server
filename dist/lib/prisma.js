// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma";
// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };
// const connectionString = process.env.DATABASE_URL!;
// const adapter = new PrismaPg({ connectionString });
// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//   });
// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }
// export default prisma;
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
config();
const globalForPrisma = globalThis;
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
export const prisma = globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
