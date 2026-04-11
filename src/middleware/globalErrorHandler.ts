import { NextFunction, Request, Response } from "express";
import AppError from "../utils/AppError.js";
import { ZodError } from "zod";
import { envVars } from "../config/envVars.js";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // 1. AppError
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  // 2. Prisma errors (unique constraint etc.)
  else if (err.code === "P2002") {
    statusCode = 400;
    const field = err.meta?.target?.[0] || "field";
    message = `Duplicate value for ${field}`;
  }

  //  3. Zod validation errors
  else if (err instanceof ZodError) {
    statusCode = 400;
    message = err.errors.map((e) => e.message).join(", ");
  }

  // 4. Unauthorized errors
  else if (err.status === 401) {
    statusCode = 401;
    message = "Unauthorized access";
  }

  // 5. Fallback (unknown errors)
  else if (err.message) {
    message = err.message;
  }

  // Logging ( for debugging)
  console.error("💥 ERROR:", {
    path: req.originalUrl,
    method: req.method,
    message: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(envVars.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};
