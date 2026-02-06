import { Request, Response } from "express";
export declare const medicineController: {
    getMedicine: (req: Request, res: Response) => Promise<void>;
    getMedicineById: (req: Request, res: Response) => Promise<void>;
    createMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    getMyMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    deleteMedicine: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=medicine.controller.d.ts.map