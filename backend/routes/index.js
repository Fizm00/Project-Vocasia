const express = require("express");

// init routes
const user_routes = require("./user_route");
const auth_routes = require("./auth_route");
const email_otp_routes = require("./email_otp_route");
const property_routes = require("./property_route");

// init express router
const routes = express.Router();

// routes all
routes.use(user_routes);
routes.use(auth_routes);
routes.use(email_otp_routes);
routes.use(property_routes);

// routes setup
module.exports = routes;
