import express, { Request, Response } from "express";
import { config } from "dotenv";
import { prisma } from "./lib/prisma";
import app from "./app";
const port = process.env.PORT || 5000;

// Only run server locally, not on Vercel
if (process.env.NODE_ENV !== "production" || !process.env.VERCEL) {
  async function server() {
    try {
      await prisma.$connect();
      console.log("Connected to the database successfully.");

      
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
      });

    } catch (e) {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    }
  }

  server();
}