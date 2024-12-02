const express = require("express");

// init routes
const user_routes = require("./user_route");
const auth_routes = require("./auth_route");

// init express router
const routes = express.Router();

// routes all
routes.use(user_routes);
routes.use(auth_routes);

// routes setup
module.exports = routes;
