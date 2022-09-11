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

const updateProfileUser = async (req, res) => {
    try {
        // received name and email
        const { name, email } = req.body;
        // received id
        const { id } = req.params;

        // ¿exists user?
        const user = await Users.findOne({ where: { id } });

        // if not exists
        if( !user ) {
            return res.status(404).json({
                status: 'error',
                data: {
                    message: 'user not found'
                }
            })
        }

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
        const { id } = req.params;

        const user = await Users.findOne({ where: { id } });

        if( !user ) {
            return res.status(404).json({
                status: 'error',
                data: {
                    message: 'user not found'
                }
            })
        }

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