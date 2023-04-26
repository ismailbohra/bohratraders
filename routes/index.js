const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const userRoute = require("./user.route");

const defaultRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
