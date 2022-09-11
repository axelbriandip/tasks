const express = require('express');

const usersRouter = express.Router();

// middlewares

// controllers
const {
    createUser,
    getAllUsers
} = require('../controllers/users.controllers');

// endpoints
usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:id');
usersRouter.delete('/:id');

module.exports = { usersRouter };