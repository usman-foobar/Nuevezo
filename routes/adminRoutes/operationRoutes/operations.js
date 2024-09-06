const express = require("express");
const operationsController = require("../../../controllers/adminController/operationsController");
const { getAllCustomers } = require("../../../controllers/partnerController/operationsController");
const { fetchDeals } = require("../../../controllers/partnerController/dealsController");
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
  getAllCustomers
);

router.patch(
  "/approve-customer-req/:customerId",
  operationsController.approveCustomerRegistration
);

router.get("/fetch-all-deals/", fetchDeals)

router.patch("/approve-deal/:dealId", operationsController.approveDeal)

module.exports = router;
