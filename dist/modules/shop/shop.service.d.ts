export declare const shopService: {
    getAllShopItems: () => import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    upsertUserCart: (medicineId: string, userId: string) => Promise<{
        id: string;
        userId: string;
        medicineId: string;
        quantity: number;
    }>;
};
//# sourceMappingURL=shop.service.d.ts.map