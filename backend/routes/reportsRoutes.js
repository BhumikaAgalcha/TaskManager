const express = require("express");
const { adminOnly, protect } = require("../middleware/authMiddleware");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportsController");

const router = express.Router();

router.get("/export/tasks", protect, adminOnly, exportTasksReport);//Export all tasks as Excel/PDF
router.get("/export/users", protect, adminOnly, exportUsersReport); // Export all users as Excel/PDF

module.exports = router;