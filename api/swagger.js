const personControllerSwagger = require("./controllers/person/swagger.json");

module.exports = function getSwaggerConfig() {
  return {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "back-end created by express js",
      description:
        "A very simple application created by express js for its back-end and react for its front-end.",
    },
    host: "localhost:9000",
    basePath: "/",
    paths: {
      ...personControllerSwagger.endpoint,
    },
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    definitions: {
      ...personControllerSwagger.types,
    },
    securityDefinitions: {
      basicAuth: {
        type: "basic",
        description:
          "This api uses basic authentication. you should put 'basic {base64(user:pass)}' here",
        name: "Authorization",
        in: "header",
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  };
};
