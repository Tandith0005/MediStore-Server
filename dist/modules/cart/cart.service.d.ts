export declare const cartService: {
    getCart: (userId: string) => Promise<({
        medicine: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            description: string | null;
            price: number;
            category: string;
            manufacturer: string;
            sellerId: string;
        };
    } & {
        id: string;
        userId: string;
        medicineId: string;
        quantity: number;
    })[]>;
    upsertUserCart: (medicineId: string, userId: string) => Promise<{
        id: string;
        userId: string;
        medicineId: string;
        quantity: number;
    }>;
    minusUserCart: (medicineId: string, userId: string) => Promise<{
        id: string;
        userId: string;
        medicineId: string;
        quantity: number;
    }>;
    deleteItemsInCart: (id: string, userId: string) => Promise<import("@prisma/client").Prisma.BatchPayload>;
};
//# sourceMappingURL=cart.service.d.ts.map