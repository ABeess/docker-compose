const path = require("path");
const favicon = require("serve-favicon");
const compress = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./logger");
require("dotenv").config();

const feathers = require("@feathersjs/feathers");
const configuration = require("@feathersjs/configuration");
const express = require("@feathersjs/express");
const socketio = require("@feathersjs/socketio");

const middleware = require("./middleware");
const services = require("./services");
const appHooks = require("./app.hooks");
const channels = require("./channels");

const authentication = require("./authentication");

const mongoose = require("./mongoose");
const client = require("./redis");

const app = express(feathers());
// (async () => await client.connect())();

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  cors({
    origin: [
      "http://localhost:3039",
      "http://34.87.93.1:3060",
      process.env.CLIENT_URL,
    ],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "Authorization",
    ],
    credentials: true,
  })
);
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get("public"), "favicon.ico")));
// Host the public folder
app.use("/", express.static(app.get("public")));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(
  socketio(function (io) {
    io.on("connection", function (socket) {
      socket.on("course-comment-join", (data) => {
        app.channel(`courseIds/${data._id}`).join(socket.feathers);
      });
      socket.on("course-comment-leave", (data) => {
        app.channel(`courseIds/${data._id}`).leave(socket.feathers);
      });
    });
    // Registering Socket.io middleware
    io.use(function (socket, next) {
      // Exposing a request property to services and hooks
      socket.feathers.referrer = socket.request.referrer;
      next();
    });
  })
);

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
