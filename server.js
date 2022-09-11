const { app } = require('./app');

const { db } = require('./utils/db.util');

const startServer = async () => {
    try {
        // authenticate db
        await db.authenticate();

        // sync db
        await db.sync();

        // init server
        const PORT = 4000;
        app.listen(PORT, () => {
            console.log('¡Express running!');
        })

    } catch (err) {
        console.log(err);
    }
}

startServer();