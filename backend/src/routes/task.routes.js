const express = require("express");
const TaskController = require("../controllers/task.controller");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.post("/", authMiddleware, TaskController.createTask);
router.get("/", authMiddleware, TaskController.getAllTasks);
router.put("/:id", authMiddleware, TaskController.updateTask);
router.delete("/:id", authMiddleware, TaskController.deleteTask);

module.exports = router;
