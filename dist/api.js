import app from "./app.js";
import { prisma } from "./lib/prisma.js";
export default async function handler(req, res) {
    try {
        // Ensure Prisma is connected
        if (!prisma) {
            return res.status(500).json({ error: "Database connection failed" });
        }
        return app(req, res);
    }
    catch (error) {
        console.error("Handler error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}
//# sourceMappingURL=api.js.map