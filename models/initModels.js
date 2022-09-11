const { Tasks } = require('./tasks.model');
const { Users } = require('./users.model');

const initModels = () => {
    // 1 Users <--> M Tasks
    Users.hasMany(Tasks, { foreignKey: 'userId' });
    Tasks.belongsTo(Users);
}

module.exports = { initModels };