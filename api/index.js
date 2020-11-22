const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger");
var cors = require("cors");
const app = express();
const registerRoutes = require("./routes");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument()));
app.use(cors());
app.use(express.static("public"));
// parse request bodies (req.body)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  res.send(__dirname);
});

registerRoutes(app);

//global error handler
app.use((error, req, res, next) => {
  res.status(500).send({ error: error.stack });
});

app.listen(9000, () => {
  console.log("app is running");
});
