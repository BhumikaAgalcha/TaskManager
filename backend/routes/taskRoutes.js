const express = require("express");
const {protect , adminOnly} = require("../middleware/authMiddleware");
const { getDashboardData, getUserDashboardData, getAllTasks, getTaskById, createTask, updateTask, deleteTask, updateTaskStatus, updateTaskChecklist } = require("../controllers/taskController");

const router = express.Router();

//Task Management Routes
router.get("/dashboard",protect ,getDashboardData); // Get Dashboard
router.get("/user-dashboard",protect ,getUserDashboardData); // Get User Dashboard
router.get("/",protect ,getAllTasks); // Get All Tasks
router.get("/:id",protect ,getTaskById); // Get Task By ID
router.post("/",protect,adminOnly ,createTask); // Create Task
router.put("/:id",protect, updateTask); // Update Task
router.delete("/:id",protect,adminOnly ,deleteTask); // Delete Task
router.put("/:id/status",protect,updateTaskStatus); // Update Task Status
router.put("/:id/todo",protect,updateTaskChecklist); // Update Task Todo

module.exports = router;