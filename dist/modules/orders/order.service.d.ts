import { OrderStatus } from "@prisma/client";
export declare const orderService: {
    createOrder: ({ userId }: {
        userId: string;
    }) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        total: number;
    }>;
    getUsersOrder: (userId: string) => Promise<({
        items: ({
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
            price: number;
            medicineId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        total: number;
    })[]>;
    fetchSellerOrders: (sellerId: string) => Promise<({
        customer: {
            name: string | null;
            id: string;
            email: string;
            emailVerified: boolean;
            createdAt: Date;
            updatedAt: Date;
            image: string | null;
            role: import("@prisma/client").$Enums.UserRole;
            status: import("@prisma/client").$Enums.Status;
        };
        items: ({
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
            price: number;
            medicineId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        total: number;
    })[]>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        total: number;
    }>;
    fetchAllOrdersForAdmin: () => Promise<({
        customer: {
            name: string | null;
            id: string;
            email: string;
        };
        items: ({
            medicine: {
                name: string;
            };
        } & {
            id: string;
            price: number;
            medicineId: string;
            quantity: number;
            orderId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        status: import("@prisma/client").$Enums.OrderStatus;
        customerId: string;
        total: number;
    })[]>;
};
//# sourceMappingURL=order.service.d.ts.map