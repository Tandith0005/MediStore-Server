import { prisma } from "./lib/prisma";
const port = 5000;
async function server() {
    try {
        await prisma.$connect();
        console.log("Connected to the database successfully.");
    }
    catch (e) {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    }
}
server();
