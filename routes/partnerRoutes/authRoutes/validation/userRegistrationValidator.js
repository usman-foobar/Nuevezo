const { body } = require("express-validator");

const userRegistrationValidator = [
  body("name")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("Name is required"),
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = { userRegistrationValidator };
