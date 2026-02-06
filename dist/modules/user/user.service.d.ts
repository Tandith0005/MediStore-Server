import { Status } from "@prisma/client";
export declare const userService: {
    getAllUsers: () => Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.Status;
    }[]>;
    banUser: (userId: string, stat: Status) => Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.Status;
    }>;
    updateUser: (userId: string, payload: {
        name?: string;
        phone?: string;
        address?: string;
    }) => Promise<{
        name: string | null;
        id: string;
        email: string;
        role: import("@prisma/client").$Enums.UserRole;
    }>;
    deleteUser: (userId: string) => Promise<{
        name: string | null;
        id: string;
        email: string;
        emailVerified: boolean;
        createdAt: Date;
        updatedAt: Date;
        image: string | null;
        role: import("@prisma/client").$Enums.UserRole;
        status: import("@prisma/client").$Enums.Status;
    }>;
};
//# sourceMappingURL=user.service.d.ts.map