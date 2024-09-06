const express = require("express");
const operationsController = require("../../../controllers/partnerController/operationsController");
const { createCustomerValidator } = require("./validations/createCustomerValidator");
const { listProducts } = require("../../../controllers/adminController/productController");

const router = express.Router();

router.post("/create-customer", createCustomerValidator, operationsController.createCustomer);
router.get("/fetch-all-customers", operationsController.getAllCustomers);
router.get("/list-products", listProducts);

module.exports = router;
