import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createWorkoutSchedule,
  getWorkoutScheduleByUser,
  updateWorkoutSchedule,
  deleteWorkoutSchedule
} from "../controllers/workoutScheduleController.js";

const router = express.Router();

// Tạo lịch tập cho user (staff/coach)
router.post("/user/:userId", authMiddleware, createWorkoutSchedule);
// Lấy lịch tập của user
router.get("/user/:userId", authMiddleware, getWorkoutScheduleByUser);
// Cập nhật lịch tập
router.put("/:scheduleId", authMiddleware, updateWorkoutSchedule);
// Xóa lịch tập
router.delete("/:scheduleId", authMiddleware, deleteWorkoutSchedule);

export default router; 