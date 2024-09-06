const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes/auth");
const operationsRoutes = require("./operationsRoutes/operations");
const dealsRoutes = require("./dealsRoutes/deals");
const { verifyPartnerToken } = require("../../authentication/jwtValidation");

router.use("/auth", authRoutes);
router.use("/operations", verifyPartnerToken, operationsRoutes);
router.use("/deals", verifyPartnerToken, dealsRoutes);

module.exports = router;
