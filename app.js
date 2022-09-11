const express = require('express');
const app = express();

app.use(express.json());

// import router
const { usersRouter } = require('./routes/users.routes');

// define endpoints
app.use('/api/v1/users', usersRouter);

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