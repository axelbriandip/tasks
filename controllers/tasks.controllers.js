// models
const { Tasks } = require('../models/tasks.model');
const { Users } = require('../models/users.model');

const compareDates = (limit, finish) => {
    const lim = `${limit.getFullYear()}-${limit.getMonth()+1}-${limit.getDate()}`;
    const finishConverted = new Date(finish);
    const fin = `${finishConverted.getFullYear()}-${finishConverted.getMonth()+1}-${finishConverted.getDate()}`;
    if(fin > lim) return 1 // task late
    else return 2 // task completed
}

const getAllTasks = async (req, res) => {
    try {
        // received all users
        const tasks = await Tasks.findAll({
            attributes: [ 'id', 'title', 'startDate', 'limitDate', 'finishDate', 'status' ],
            include: { model: Users, attributes: [ 'id', 'name', 'email' ] }
        });

        // res
        res.status(200).json({
            status: 'success',
            data: {
                tasks
            }
        })

    } catch (err) {
        console.log(err);
    }
}

const getAllTasksForStatus = async (req, res) => {
    try {
        // received status params
        const { status } = req.params;

        if(
            status=='active' ||
            status=='completed' ||
            status=='late' ||
            status=='cancelled'
        ) {
            // received all users
            const tasks = await Tasks.findAll({
                where: {
                    status
                }
            });

            // res
            res.status(200).json({
                status: 'success',
                data: {
                    tasks
                }
            })
        } else {
            return res.status(404).json({
                status: 'error',
                data: {
                    message: 'status not valid'
                }
            })
        }

    } catch (err) {
        console.log(err);
    }
}

const createTask = async (req, res) => {
    try {
        // received user
        const { title, userId, startDate, limitDate } = req.body;

        // create user
        const newTask = await Tasks.create({
            title, userId, startDate, limitDate
        })

        // response
        res.status(201).json({
            status: 'success',
            data: {
                newTask
            }
        })
    } catch (err) {
        console.log(err);
    }
}

const insertFinishDate = async (req, res) => {
    try {
        // received finish date
        const { finishDate } = req.body;

        // received task
        const { task } = req;

        const result = compareDates( task.limitDate, finishDate );

        if( result == 1 ) {
            await task.update({
                finishDate,
                status: 'late'
            });
        } else {
            await task.update({
                finishDate,
                status: 'completed'
            });
        }

        // response
        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        })

    } catch (err) {
        console.log(err);
    }
}

const deleteTask = async (req, res) => {
    try {
        const { task } = req;

        task.update({ status: 'cancelled' });

        res.status(200).json({
            status: 'success',
            data: {
                task
            }
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    createTask,
    deleteTask,
    getAllTasks,
    insertFinishDate,
    getAllTasksForStatus
};