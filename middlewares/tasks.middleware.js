const { Tasks } = require('../models/tasks.model');

const tasksExists = async (req, res, next) => {
    try {
        // received id
        const { id } = req.params;

        // ¿exists task?
        const task = await Tasks.findOne({ where: { id, status: 'active' } });

        // if not exists
        if( !task ) {
            return res.status(404).json({
                status: 'error',
                data: {
                    message: 'task active not found'
                }
            })
        }

        // if exists
        req.task = task;

        next();
    } catch (err) {
        console.log(err);
    }
}

module.exports = { tasksExists };