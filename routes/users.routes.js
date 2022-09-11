const express = require('express');

const usersRouter = express.Router();

// middlewares

// controllers
const {
    createUser,
    getAllUsers,
    updateProfileUser
} = require('../controllers/users.controllers');

// endpoints
usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:id', updateProfileUser);
usersRouter.delete('/:id');

module.exports = { usersRouter };