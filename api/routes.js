const personController = require('./controllers/person');

module.exports = function registerRoutes(app) {
  app.use('/people', personController);
};
