const { body } = require("express-validator");

const createProductValidator = [
  body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 100 })
    .withMessage("Name must be less than 100 characters"),
  
  body("description")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description must be less than 500 characters"),

  body("price")
    .isFloat({ gt: 0 })
    .withMessage("Price must greater than 0")
];

module.exports = { createProductValidator };
