const express = require('express');

const usersRouter = express.Router();

// middlewares
const {
    createUserValidator,
    userExists
} = require('../middlewares/users.middleware');

// controllers
const {
    createUser,
    getAllUsers,
    updateProfileUser,
    deleteUser
} = require('../controllers/users.controllers');

// endpoints
usersRouter.post('/', createUserValidator, createUser);
usersRouter.get('/', getAllUsers);
usersRouter.patch('/:id', userExists, updateProfileUser);
usersRouter.delete('/:id', userExists, deleteUser);

module.exports = { usersRouter };