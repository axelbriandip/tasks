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

const compareDates = (limit, finish) => {
    const finishConverted = new Date(finish);
    const fin = `${finishConverted.getFullYear()}-${finishConverted.getMonth()+1}-${finishConverted.getDate()}`;
    const lim = `${limit.getFullYear()}-${limit.getMonth()+1}-${limit.getDate()}`;
    
    if(fin > lim) return 1 // task late
    else return 2 // task completed
}

module.exports = { tasksExists, compareDates };