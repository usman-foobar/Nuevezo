const { body } = require("express-validator");

const userLoginValidator = [
  body("email").isEmail().normalizeEmail().withMessage("Invalid email address"),
  body("password")
    .isLength({ min: 8})
    .withMessage("Password must be at least 8 characters long"),
];

module.exports = { userLoginValidator };
