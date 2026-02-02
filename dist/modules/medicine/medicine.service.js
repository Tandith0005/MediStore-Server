import { prisma } from "../../lib/prisma";
// create your medicine
const createMedicine = async (payload) => {
    const addMedicine = await prisma.medicines.create({
        data: {
            name: payload.name,
            description: payload.description,
            manufacturer: payload.manufacturer,
            price: payload.price,
            image: payload.image,
            category: payload.category,
            sellerId: payload.sellerId,
        },
    });
    return addMedicine;
};
const getMedicine = async (query) => {
    const { search, category, manufacturer, minPrice, maxPrice } = query;
    return prisma.medicines.findMany({
        where: {
            AND: [
                search
                    ? {
                        name: {
                            contains: search,
                            mode: "insensitive",
                        },
                    }
                    : {},
                category && category !== "All" ? { category } : {},
                manufacturer && manufacturer !== "All" ? { manufacturer } : {},
                minPrice || maxPrice
                    ? {
                        price: {
                            gte: minPrice ? Number(minPrice) : undefined,
                            lte: maxPrice ? Number(maxPrice) : undefined,
                        },
                    }
                    : {},
            ],
        },
        orderBy: { createdAt: "desc" },
    });
};
// get specific medicine
const getMedicineById = async (id) => {
    const medicine = await prisma.medicines.findUnique({ where: { id } });
    return medicine;
};
// get your own medicines
const getMyMedicine = async (userId) => {
    const medicine = await prisma.medicines.findMany({
        where: { sellerId: userId },
    });
    return medicine;
};
// update your medicine
const updateMedicine = async (payload, userId, userRole) => {
    if (!payload.id)
        throw new Error("Medicine ID is required for update");
    const existingMedicine = await prisma.medicines.findUnique({
        where: { id: payload.id },
    });
    if (!existingMedicine)
        throw new Error("Medicine not found");
    // Only seller who owns the medicine or admin to update
    if (userRole !== "ADMIN" && existingMedicine.sellerId !== userId) {
        throw new Error("You are not authorized to update this medicine");
    }
    const medicine = await prisma.medicines.update({
        where: { id: payload.id },
        data: {
            name: payload.name,
            description: payload.description,
            price: payload.price,
            image: payload.image,
            category: payload.category,
        },
    });
    return medicine;
};
// delete your medicine
const deleteMedicine = async (id, userId, role) => {
    const medicine = await prisma.medicines.findUnique({ where: { id } });
    if (!medicine) {
        throw new Error("Medicine not found");
    }
    if (role !== "ADMIN" && medicine.sellerId !== userId) {
        throw new Error("Forbidden");
    }
    return prisma.medicines.delete({
        where: { id },
    });
};
// const getMedicines = async (query: FilterQuery) => {
//   const { search, category, manufacturer, minPrice, maxPrice } = query;
//   return prisma.medicines.findMany({
//     where: {
//       AND: [
//         search
//           ? {
//               name: {
//                 contains: search,
//                 mode: "insensitive",
//               },
//             }
//           : {},
//         category && category !== "All" ? { category } : {},
//         manufacturer && manufacturer !== "All" ? { manufacturer } : {},
//         minPrice || maxPrice
//           ? {
//               price: {
//                 gte: minPrice ? Number(minPrice) : undefined,
//                 lte: maxPrice ? Number(maxPrice) : undefined,
//               },
//             }
//           : {},
//       ],
//     },
//     orderBy: { createdAt: "desc" },
//   });
// };
export const medicineService = {
    getMedicine,
    getMedicineById,
    createMedicine,
    getMyMedicine,
    updateMedicine,
    deleteMedicine,
    // getMedicines,
};
