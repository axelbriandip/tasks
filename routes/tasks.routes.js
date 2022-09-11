const express = require('express');

const tasksRouter = express.Router();

// controllers
const {
    createTask,
    deleteTask,
    getAllTasks,
    insertFinishDate
} = require('../controllers/tasks.controllers');

// endpoints
tasksRouter.post('/', createTask);
tasksRouter.get('/', getAllTasks);
tasksRouter.patch('/:id', insertFinishDate);
tasksRouter.delete('/:id', deleteTask);

module.exports = { tasksRouter };