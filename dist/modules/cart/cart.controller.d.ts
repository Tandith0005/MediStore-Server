import { Request, Response } from 'express';
export declare const cartController: {
    getCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    upsertUserCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    minusUserCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteItemsInCart: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=cart.controller.d.ts.map