const express = require("express");
const operationsController = require("../../../controllers/adminController/operationsController");
const router = express.Router();

router.get(
  "/fetch-all-partners/:registrationStatus",
  operationsController.getAllPartners
);

router.patch(
  "/approve-partner-req/:partnerId",
  operationsController.approvePartnerRegistration
);

module.exports = router;
