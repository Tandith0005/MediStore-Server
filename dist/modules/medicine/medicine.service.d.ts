import { CreateMedicinePayload } from "../../types/index.js";
interface FilterQuery {
    search?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
}
interface FilterQuery {
    search?: string;
    category?: string;
    manufacturer?: string;
    minPrice?: string;
    maxPrice?: string;
}
export declare const medicineService: {
    getMedicine: (query: FilterQuery) => Promise<{
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
    getMedicineById: (id: string) => Promise<{
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
    } | null>;
    createMedicine: (payload: CreateMedicinePayload) => Promise<{
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
    }>;
    getMyMedicine: (userId: string) => Promise<{
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
    updateMedicine: (payload: CreateMedicinePayload, userId: string, userRole: string) => Promise<{
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
    }>;
    deleteMedicine: (id: string, userId: string, role: string) => Promise<{
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
    }>;
};
export {};
//# sourceMappingURL=medicine.service.d.ts.map