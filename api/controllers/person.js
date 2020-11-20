const express = require('express');

const route = express.Router();

route.use(require('../shared/basic-authentication'));

const data = [];

route.get('/', (req, res) => {
  res.send(data);
});

route.get('/:id', (req, res) => {
  const obj = getPerson(req.params.id, res);
  if (obj) res.status(200).send(obj);
});

route.post('/', (req, res) => {
  if (Array.isArray(req.body)) {
    for (const item of req.body) {
      if (!validateModel(item, res)) return;
      if (data.find((x) => x.id == item.id)) {
        res.status(400).send(`id '${item.id}' is duplicated`);
        break;
      }
      data.push(item);
    }
  } else {
    if (!validateModel(req.body, res)) return;
    if (data.find((x) => x.id == req.body.id)) {
      res.status(400).send(`id '${req.body.id}' is duplicated`);
      return;
    }
    data.push(req.body);
  }
  res.status(201).send(req.body);
});

route.put('/:id', (req, res) => {
  if (!validateModel(req.body, res)) return;
  if (!req.params.id) {
    res.status(400).send('id is empty');
    return;
  }
  const obj = getPerson(req.params.id, res);
  if (!obj) return;
  const oldObj = { ...obj };
  data[data.indexOf(obj)] = req.body;
  res.status(202).send(`person ${oldObj.name} is modified to ${req.body.name}`);
});

route.delete('/:id', (req, res) => {
  const obj = getPerson(req.params.id, res);
  if (obj) {
    data.splice(data.indexOf(obj), 1);
    res.status(202).send();
  }
});

function validateModel(obj, res) {
  if (!obj.id || !obj.name) {
    res.status(400).send('model is not valid');
    return false;
  }
  return true;
}

function getPerson(id, res) {
  const obj = data.find((x) => x.id == id);
  if (!obj) {
    res.status(404).send(`person with id '${id}' is not found`);
    return null;
  }
  return obj;
}

module.exports = route;
