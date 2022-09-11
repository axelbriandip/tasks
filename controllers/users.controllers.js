// models
const { Users } = require('../models/users.model');

const getAllUsers = async (req, res) => {
    try {
        // received all users
        const users = await Users.findAll();

        // res
        res.status(200).json({
            status: 'success',
            data: {
                users
            }
        })

    } catch (err) {
        console.log(err);
    }
}

const createUser = async (req, res) => {
    try {
        // received user
        const { name, email, password } = req.body;

        // create user
        const newUser = await Users.create({
            name, email, password
        })

        // response
        res.status(201).json({
            status: 'success',
            data: {
                newUser
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createUser, getAllUsers };