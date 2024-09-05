const express = require("express");
const operationsController = require("../../../controllers/adminController/operationsController");
const router = express.Router();

router.get(
  "/fetch-all-partners/:approvalStatus",
  operationsController.getAllPartners
);

router.patch(
  "/approve-partner-req/:partnerId",
  operationsController.approvePartnerRegistration
);

router.get(
  "/fetch-all-customers/:approvalStatus",
  operationsController.getAllCustomers
);

router.patch(
  "/approve-customer-req/:customerId",
  operationsController.approveCustomerRegistration
);
module.exports = router;
