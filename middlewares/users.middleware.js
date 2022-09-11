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

module.exports = { createUserValidator };