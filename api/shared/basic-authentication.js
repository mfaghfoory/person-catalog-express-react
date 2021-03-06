const user = "test";
const pass = "test";

module.exports = (req, res, next) => {
  if (
    !req.headers.authorization ||
    req.headers.authorization.toLowerCase().indexOf("basic") < 0
  ) {
    return res.status(401).send("you are not authenticated");
  }
  const header = req.headers.authorization
    .replace("basic ", "")
    .replace("Basic ", "");
  const userPass = Buffer.from(header, "base64").toString("utf8").split(":");
  if (userPass.length < 2 || userPass[0] != user || userPass[1] != pass) {
    return res.status(401).send("authorization header is not valid");
  }
  next();
};
