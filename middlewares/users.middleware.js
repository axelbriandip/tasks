const { Users } = require('../models/users.model');
const { body, validationResult } = require('express-validator');

const checkValidations = (req, res, next) => {
    const errors = validationResult(req);

    if( !errors.isEmpty() ) {
        const errorMessages = errors.array().map(item => {
            return item.msg;
        })

        const messages = errorMessages.join(' / ');

        return res.status(400).json({
            status: 'error',
            data: {
                messages
            }
        })
    }

    next();
}

const createUserValidator = [
    body('name')
        .isString().withMessage('name must be string')
        .notEmpty().withMessage('name dont must be empty')
        .isLength({ min: 3 }).withMessage('name must have minimum 3 characters'),
        
    body('email')
        .isEmail().withMessage('email must have email format'),
        
    body('password')
        .isString().withMessage('password must be string')
        .notEmpty().withMessage('password dont must be empty')
        .isLength({ min: 8 }).withMessage('password must have minimum 8 characters'),
    checkValidations
]

const userExists = async (req, res, next) => {
    try {
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
        req.user = user;

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { createUserValidator, userExists };