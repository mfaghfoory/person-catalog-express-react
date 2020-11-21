const personController = require("./controllers/person-controller");

module.exports = function registerRoutes(app) {
  app.use("/people", personController);
};
