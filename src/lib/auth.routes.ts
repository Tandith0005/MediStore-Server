import { Router } from "express";
import verifyRole from "../middleware/verifyRole.js";


const router = Router();

router.get("/me", verifyRole(), (req, res) => {
  res.json(req.user);
});

export const authRoutes = router;
