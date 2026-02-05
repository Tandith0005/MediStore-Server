"use strict";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
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
require("dotenv/config");
const pg_1 = require("pg");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const globalForPrisma = globalThis;
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
});
const adapter = new adapter_pg_1.PrismaPg(pool);
exports.prisma = globalForPrisma.prisma ??
    new client_1.PrismaClient({
        adapter,
    });
if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = exports.prisma;
}
//# sourceMappingURL=prisma.js.map