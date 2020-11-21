const express = require("express");
const { body, param, validationResult } = require("express-validator");

const route = express.Router();

const personService = new (require("../services/person-service"))();

route.use(require("../shared/basic-authentication"));

route.get("/", async (req, res) => {
  const data = await personService.getAllPersons();
  res.send(data);
});

route.get("/:id", async (req, res) => {
  const obj = await personService.findById(req.params.id);
  if (obj) return res.status(200).send(obj);
  return res.status(404).send();
});

route.post("/", validateModel(), (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  personService
    .addNewPerson(req.body)
    .then((obj) => {
      res.status(201).send(obj);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

route.put(
  "/:id",
  [...validateModel(), param("id").notEmpty().isNumeric()],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    personService
      .updatePerson(req.params.id, req.body)
      .then((obj) => {
        res.status(202).send(obj);
      })
      .catch((err) => {
        res.status(400).send(err.message);
      });
  }
);

route.delete("/:id", (req, res) => {
  personService
    .deletePerson(req.params.id)
    .then((obj) => {
      res.status(202).send();
    })
    .catch((err) => {
      res.status(400).send(err.message);
    });
});

function validateModel() {
  return [
    body("name").isLength({ min: 2 }).withMessage("min length is 2"),
    body("bio").notEmpty().withMessage("must have value"),
    body("email").isEmail().withMessage("valid email required"),
  ];
}

module.exports = route;
