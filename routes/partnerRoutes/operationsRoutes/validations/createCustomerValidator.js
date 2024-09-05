const { body } = require("express-validator");

const createCustomerValidator = [
  body("name").isString().trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
];

module.exports = { createCustomerValidator };
