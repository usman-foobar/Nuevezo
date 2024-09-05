const express = require("express");
const router = express.Router();

const {
  userRegistrationValidator,
} = require("./validation/userRegistrationValidator");

const { userLoginValidator } = require("./validation/userLoginValidator");
const authController = require("../../../controllers/partnerController/authController");
const { verifyPartnerToken } = require("../../../authentication/jwtValidation");

router.post(
  "/register",
  userRegistrationValidator,
  authController.registerPartner
);
router.post("/login", userLoginValidator, authController.loginPartner);

module.exports = router;
