module.exports = class BaseService {
  constructor(model) {
    if (!model) throw new Error("please specify base model");
    this.repo = model;
  }
  async getAll() {
    return await this.repo.findAll();
  }

  async findById(id) {
    return await this.repo.findByPk(id);
  }

  async addNew(obj) {
    return await this.repo.create(obj);
  }

  async update(id, obj) {
    const data = await this.findById(id);
    if (!data) throw new Error(`id '${id}' is not found`);
    await data.update(obj);
    return data;
  }

  async delete(id) {
    const data = await this.findById(id);
    if (!data) throw new Error(`id '${id}' is not found`);
    await data.destroy();
  }
};
