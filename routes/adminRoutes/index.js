const express = require("express");
const router = express.Router();

const loginRoutes = require("./loginRoutes/login");
const {
  verifyAdminAccessToken,
} = require("../../authentication/jwtValidation");
const operationRoutes = require("./operationRoutes/operations");
const productRoutes = require("./productRoutes/products");

router.use("/login", loginRoutes);
router.use(
  "/operations",
  verifyAdminAccessToken,
  operationRoutes
);

router.use("/products", verifyAdminAccessToken, productRoutes);

module.exports = router;
