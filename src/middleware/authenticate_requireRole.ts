// middlewares/auth.middleware.ts
import { NextFunction, Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth.js";
import AppError from "../utils/AppError.js";
import status from "http-status";
import { UserRole } from "../generated/client/index.js";



declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
        role: UserRole;
        emailVerified: boolean;
        isDeleted: boolean;
      }
    }
  }
}

// Main authentication middleware
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sessionData = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    const { user } = sessionData ?? {};

    if (!user) {
      return next(new AppError(status.UNAUTHORIZED, "Unauthorized - Please log in"));
    }

    // Block deleted users
    if (user.isDeleted === true) {
      return next(
        new AppError(
          status.FORBIDDEN,
          "Your account has been banned. Please contact support."
        )
      );
    }

    
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name || "",
      role: user.role as UserRole,
      emailVerified: user.emailVerified,
      isDeleted: user.isDeleted || false,
    };

    next();
  } catch (error) {
    next(new AppError(status.UNAUTHORIZED, "Authentication failed"));
  }
};

// Role verification middleware (to be used after authenticate)
export const requireRole = (...allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError(status.UNAUTHORIZED, "Authentication required"));
    }

    if (allowedRoles.length && !allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          status.FORBIDDEN,
          "Forbidden! You don't have permission to access this resource."
        )
      );
    }

    next();
  };
};