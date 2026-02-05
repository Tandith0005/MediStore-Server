import { medicineService } from "./medicine.service.js";
// create your medicine
const createMedicine = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const data = {
            ...req.body,
            sellerId: req.user.id,
        };
        // business logic here
        const result = await medicineService.createMedicine(data);
        res.status(201).json(result);
    }
    catch (e) {
        console.error("CREATE MEDICINE ERROR:", e);
        res.status(400).json({
            error: " Operation failed",
            details: e,
        });
    }
};
// get all medicines
const getMedicine = async (req, res) => {
    try {
        const { search, category, manufacturer, minPrice, maxPrice } = req.query;
        const result = await medicineService.getMedicine({
            search: search,
            category: category,
            manufacturer: manufacturer,
            minPrice: minPrice,
            maxPrice: maxPrice,
        });
        res.status(200).json(result);
    }
    catch (e) {
        console.error(e);
        res.status(400).json({
            error: "Operation failed",
            details: e,
        });
    }
};
// get specific medicine
const getMedicineById = async (req, res) => {
    try {
        const { id } = req.params;
        // business logic here
        const result = await medicineService.getMedicineById(id);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e,
        });
    }
};
// get your own medicines
const getMyMedicine = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await medicineService.getMyMedicine(req.user.id);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e,
        });
    }
};
// update your medicine
const updateMedicine = async (req, res) => {
    try {
        const data = req.body;
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await medicineService.updateMedicine(data, req.user.id, req.user.role);
        res.status(201).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e,
        });
    }
};
// delete your medicine
const deleteMedicine = async (req, res) => {
    try {
        const { id } = req.params;
        if (!req.user) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        // business logic here
        const result = await medicineService.deleteMedicine(id, req.user.id, req.user.role);
        res.status(200).json(result);
    }
    catch (e) {
        res.status(400).json({
            error: " Operation failed",
            details: e,
        });
    }
};
// main shop filters ----------------------------------
// const getMedicines = async (req: Request, res: Response) => {
//   try {
//     const medicines = await medicineService.getMedicines(req.query);
//     res.json(medicines);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch medicines" });
//   }
// };
export const medicineController = {
    getMedicine,
    getMedicineById,
    createMedicine,
    getMyMedicine,
    updateMedicine,
    deleteMedicine,
    // getMedicines
};
//# sourceMappingURL=medicine.controller.js.map