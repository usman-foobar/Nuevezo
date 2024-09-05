const { body } = require("express-validator");

const kycValidator = [
  body("address1").isString().notEmpty().withMessage("Address1 is required"),
  body("address2").optional().isString(),
  body("city").isString().notEmpty().withMessage("City is required"),
  body("state").isString().notEmpty().withMessage("State is required"),
  body("zipCode").isNumeric().withMessage("Zip code must be a number"),
  body("phoneNumber")
    .isString()
    .notEmpty()
    .withMessage("Phone number is required"),
];

module.exports = { kycValidator };
