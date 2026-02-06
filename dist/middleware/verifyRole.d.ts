import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                email: string;
                name: string;
                role: string;
                emailVerified: boolean;
            };
        }
    }
}
declare const verifyRole: (...roles: UserRole[]) => (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default verifyRole;
//# sourceMappingURL=verifyRole.d.ts.map