const express = require("express");
const operationsController = require("../../../controllers/partnerController/operationsController");
const { createCustomerValidator } = require("./validations/createCustomerValidator");

const router = express.Router();

router.post("/create-customer", createCustomerValidator, operationsController.createCustomer);
router.get("/fetch-all-customers/:approvalStatus", operationsController.getAllCustomers);

module.exports = router;
