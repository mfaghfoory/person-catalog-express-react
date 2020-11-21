const { validationResult } = require("express-validator");

module.exports = class BaseController {
  constructor(baseService) {
    if (!baseService) throw new Error("please specify base service");
    this.service = baseService;
  }
  async getAll(req, res) {
    const obj = await this.service.getAll();
    if (obj) return res.status(200).send(obj);
    return res.status(404).send();
  }

  async getById(req, res) {
    const obj = await this.service.findById(req.params.id);
    if (obj) return res.status(200).send(obj);
    return res.status(404).send();
  }

  create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    this.service
      .addNew(req.body)
      .then((obj) => {
        res.status(201).send(obj);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  }

  update(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    this.service
      .update(req.params.id, req.body)
      .then((obj) => {
        res.status(202).send(obj);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }

  delete(req, res) {
    this.service
      .delete(req.params.id)
      .then((obj) => {
        res.status(202).send();
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
};
