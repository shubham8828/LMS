import express from "express";
import auth from "../middleware/authMiddleware.js";
import { addIntern, dashboard,getInterns ,deleteIntern,updateIntern,getInternById} from "../controllers/adminController.js";
import adminOnly from "../middleware/adminOnly.js";
import authMiddleware  from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/dashboard", authMiddleware, adminOnly, dashboard);
router.get("/getInterns", authMiddleware, adminOnly, getInterns);
router.delete("/interns/:id", authMiddleware, adminOnly, deleteIntern);
router.post("/addIntern",authMiddleware, adminOnly, addIntern);
router.get("/intern/:id", authMiddleware, adminOnly, getInternById);
router.put("/intern/:id", authMiddleware, adminOnly, updateIntern);

export default router;
