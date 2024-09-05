const express = require("express");
const router = express.Router();

const authRoutes = require("./authRoutes/auth");
const profileRoutes = require("./profileRoutes/userProfile");
const operationsRoutes = require("./operationsRoutes/operations");
const { verifyPartnerToken } = require("../../authentication/jwtValidation");

router.use("/auth", authRoutes);
router.use("/profile", verifyPartnerToken, profileRoutes);
router.use("/operations", verifyPartnerToken, operationsRoutes);

module.exports = router;
