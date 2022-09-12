const express = require('express');

const { tasksExists } = require('../middlewares/tasks.middleware');

const tasksRouter = express.Router();

// controllers
const {
    createTask,
    deleteTask,
    getAllTasks,
    insertFinishDate,
    getAllTasksForStatus
} = require('../controllers/tasks.controllers');

// endpoints
tasksRouter.post('/', createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.get('/:status', getAllTasksForStatus);
tasksRouter.patch('/:id', tasksExists, insertFinishDate);
tasksRouter.delete('/:id', tasksExists, deleteTask);

module.exports = { tasksRouter };