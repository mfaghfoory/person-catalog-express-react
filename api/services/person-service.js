const person = require("../shared/db-models").Person;
const BaseService = require("./base-service");

module.exports = class PersonService extends (
  BaseService
) {
  constructor() {
    super(person);
  }
};
