const personController = require("./controllers/person/person-controller");

module.exports = function registerRoutes(app) {
  app.use("/people", personController);
};
