import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
import app from "./app";
const port = 5000;

async function server() {
  try {
    await prisma.$connect();
    console.log("Connected to the database successfully.");


  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  }
}

server();