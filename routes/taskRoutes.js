const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const isAuthenticated  = require("../middlewares/auth.js");
const isAuthenticatedAdmin = require('../middlewares/auth.js');

// Create a new task
router.post('/tasks',isAuthenticated, taskController.createTask); //admin

// Get all tasks
router.get('/tasks',isAuthenticatedAdmin, taskController.getAllTasks);

// Get a task by ID
router.get('/tasks/:id',isAuthenticatedAdmin, taskController.getTaskById); //admin

// Update a task by ID
router.put('/tasks/:id',isAuthenticated, taskController.updateTask); //admin

// Delete a task by ID
router.delete('/tasks/:id',isAuthenticated, taskController.deleteTask); //admin

router.put('/tasks/:taskId/discussions',isAuthenticated, taskController.addOrUpdateDiscussionToTask); //admin
router.post('/tasks/:taskId/discussions',isAuthenticated, taskController.addOrUpdateDiscussionToTask); 
router.get('/tasks/:taskId/discussions',isAuthenticated, taskController.getDiscussions); //admin /student
router.delete('/tasks/:taskId/discussions/:discussionIndex',isAuthenticated, taskController.deleteDiscussionFromTask); //admin


module.exports = router;

