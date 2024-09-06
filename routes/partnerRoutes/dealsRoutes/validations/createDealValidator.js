const { body } = require("express-validator");

const createDealValidator = [
  body("customerId").isNumeric().withMessage("Invalid customer Id"),
  body("productId").isNumeric().withMessage("Invalid customer Id"),
  body("quantity").isInt({gt: 0}).withMessage("Quantity cannot be 0"),
];

module.exports = { createDealValidator };
