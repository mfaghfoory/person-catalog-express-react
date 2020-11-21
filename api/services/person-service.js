const person = require("../shared/db-models").Person;

module.exports = class PersonService {
  async getAllPersons() {
    return await person.findAll();
  }

  async findById(id) {
    return await person.findByPk(id);
  }

  async addNewPerson(obj) {
    return await person.create(obj);
  }

  async updatePerson(id, obj) {
    const data = await this.findById(id);
    if (!data) throw new Error(`id '${id}' is not found`);
    await data.update(obj);
    return data;
  }

  async deletePerson(id) {
    const data = await this.findById(id);
    if (!data) throw new Error(`id '${id}' is not found`);
    await data.destroy();
  }
};
