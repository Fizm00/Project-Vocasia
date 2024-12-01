const express = require("express");

// init routes
const user_routes = require("./user_route");

// init express router
const routes = express.Router();

// routes all
routes.use(user_routes);

// routes setup
module.exports = routes;
