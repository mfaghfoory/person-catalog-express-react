const { use } = require('../controllers/person');

const user = 'test';
const pass = 'test';

module.exports = (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.indexOf('basic') < 0
  ) {
    res.status(401).send('you are not authenticated');
    return;
  }
  const header = req.headers.authorization.replace('basic ', '');
  const userPass = Buffer.from(header, 'base64').toString('utf8').split(':');
  if (userPass.length < 2 || userPass[0] != user || userPass[1] != pass) {
    res.status(401).send('authorization header is not valid');
    return;
  }
  next();
};
