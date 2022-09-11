const express = require('express');
const app = express();

app.use(express.json());

// import router
const { usersRouter } = require('./routes/users.routes');
const { tasksRouter } = require('./routes/tasks.routes');

// define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/tasks', tasksRouter);

// if endpoints failed
app.all('*', (req, res) => {
    res.status(404).json({
        status: 'error',
        data: {
            message: `${req.method} ${req.url} no exists in our server`
        }
    })
})

module.exports = { app };