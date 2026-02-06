import { Request, Response } from 'express';
export declare const orderController: {
    createOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getUsersOrder: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    fetchSellerOrders: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateOrderStatus: (req: Request, res: Response) => Promise<void>;
    fetchAllOrdersForAdmin: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=order.controller.d.ts.map