const express = require("express");
const router = express.Router();
const productRoute = require("./product.route");
const userRoute = require("./user.route");
const adminRoute = require("./admin.route");
const orderRoute = require("./order.route");

const defaultRoutes = [
  {
    path: "/product",
    route: productRoute,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/admin",
    route: adminRoute,
  },
  {
    path: "/order",
    route: orderRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
