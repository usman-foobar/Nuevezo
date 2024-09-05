const express = require("express");
const operationsController = require("../../../controllers/partnerController/operationsController");
const router = express.Router();

router.post("/create-customer", operationsController.createCustomer);

module.exports = router;
