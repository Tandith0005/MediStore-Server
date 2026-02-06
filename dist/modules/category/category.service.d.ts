export declare const categoryService: {
    getCategories: () => Promise<{
        name: string;
        id: string;
        createdAt: Date;
    }[]>;
    createCategory: (name: string) => Promise<{
        name: string;
        id: string;
        createdAt: Date;
    }>;
};
//# sourceMappingURL=category.service.d.ts.map