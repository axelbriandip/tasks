const express = require('express');

const usersRouter = express.Router();

// middlewares

// controllers
const {
    createUser,
    getAllUsers,
    updateProfileUser,
    deleteUser
} = require('../controllers/users.controllers');

// endpoints
usersRouter.post('/', createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:id', updateProfileUser);
usersRouter.delete('/:id', deleteUser);

module.exports = { usersRouter };