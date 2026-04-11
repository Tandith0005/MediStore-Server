import express, { Application } from "express";
import cors from "cors";
import { notFound } from "./middleware/notFound.js";
import { auth } from "./lib/auth.js";
import { toNodeHandler } from "better-auth/node";
import { IndexRoutes } from "./routes/IntexRoute.js";
import { globalErrorHandler } from "./middleware/globalErrorHandler.js";
import { envVars } from "./config/envVars.js";
const app: Application = express();

//cors middleware
app.use(
  cors({
    origin: envVars.APP_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "cookie"],
  }),
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Medi Store Server Running!");
});

// Better Auth ------------------------------------------------------
app.all("/api/auth/{*any}", toNodeHandler(auth));
// Main Routes ------------------------------------------------------
app.use("/api/v1", IndexRoutes);

// Not Found ------------------------------------------------------
app.use(notFound);

// Error handling middleware
app.use(globalErrorHandler)


export default app;