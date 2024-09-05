const express = require("express");
const router = express.Router();

const loginRoutes = require("./loginRoutes/login");
const {
  verifyAdminAccessToken,
} = require("../../authentication/jwtValidation");
const operationRoutes = require("./operationRoutes/operations");

router.use("/login", loginRoutes);
router.use(
  "/operations",
  verifyAdminAccessToken,
  operationRoutes
);

module.exports = router;
