const express = require("express");
const next = require("next");
const mongoose = require("mongoose");

const config = require("./config");
const initModels = require("./models");
const initServices = require("./services");
const initRoutes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

function initDb() {
  return mongoose.connect(config.dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

async function initServer() {
  await initDb();
  const models = initModels(mongoose);
  const services = initServices(models);

  if (process.env.NODE_ENV !== "test") {
    await app.prepare();
  }
  const server = express();
  server.use(express.json());
  server.get("*", (req, res) => {
    return handle(req, res);
  });
  initRoutes(server, services);

  return server;
}

module.exports = initServer;
