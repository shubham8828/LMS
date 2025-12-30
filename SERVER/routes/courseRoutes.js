import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createCourse,
  getCourses,
  updateCourse,
  deleteCourse
} from "../controllers/courseController.js";

const router = express.Router();

/* ADMIN ONLY */
router.post("/", auth, createCourse);
router.get("/", auth, getCourses);
router.put("/:id", auth, updateCourse);
router.delete("/:id", auth, deleteCourse);

export default router;
