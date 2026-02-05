"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const prisma_1 = require("./lib/prisma");
const app_1 = __importDefault(require("./app"));
const port = process.env.PORT || 5000;
async function server() {
    try {
        await prisma_1.prisma.$connect();
        console.log("Connected to the database successfully.");
        app_1.default.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    }
    catch (e) {
        console.error(e);
        await prisma_1.prisma.$disconnect();
        process.exit(1);
    }
}
if (process.env.NODE_ENV !== "production") {
    server();
}
//# sourceMappingURL=server.js.map