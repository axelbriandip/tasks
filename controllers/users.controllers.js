// models
const { Users } = require('../models/users.model');
const { Tasks } = require('../models/tasks.model');

const getAllUsers = async (req, res) => {
    try {
        // received all users
        const users = await Users.findAll({
            where: { status: 'active' }, // view only users actives
            attributes: [ 'id', 'name', 'email' ],
            include: { model: Tasks, attributes: [ 'id', 'title', 'startDate', 'limitDate', 'finishDate' ] }
        });

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

const updateProfileUser = async (req, res) => {
    try {
        // received name and email
        const { name, email } = req.body;

        // received 'user' from 'userExists'
        const { user } = req;

        // if exists
        await user.update({ name, email });

        // response
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })

    } catch (err) {
        console.log(err);
    }
}

const deleteUser = async (req, res) => {
    try {
        const { user } = req;

        user.update({ status: 'disabled' });

        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createUser,
    getAllUsers,
    updateProfileUser,
    deleteUser
};