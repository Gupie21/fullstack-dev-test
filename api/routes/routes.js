const usersRouter = require('./user');

module.exports = function configureRoutes(app) {
    app.use('/api/users', usersRouter);

    return app;
};