const express = require("express");
const { body, param } = require("express-validator");

const route = express.Router();

const personService = new (require("../../services/person-service"))();
const baseController = new (require("../base-controller"))(personService);

route.use(require("../../shared/basic-authentication"));

route.get("/", async (req, res) => {
  baseController.getAll(req, res);
});

route.get("/:id", async (req, res) => {
  baseController.getById(req, res);
});

route.post("/", validateModel(), (req, res) => {
  baseController.create(req, res);
});

route.put(
  "/:id",
  [...validateModel(), param("id").notEmpty().isNumeric()],
  (req, res) => {
    baseController.update(req, res);
  }
);

route.delete("/:id", (req, res) => {
  baseController.delete(req, res);
});

function validateModel() {
  return [
    body("name").isLength({ min: 2 }).withMessage("min length is 2"),
    body("bio").notEmpty().withMessage("must have value"),
    body("email").isEmail().withMessage("valid email required"),
  ];
}

module.exports = route;
