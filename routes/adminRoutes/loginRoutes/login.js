const express = require("express");
const router = express.Router();

const { adminLogin } = require("../../../controllers/adminController/loginController");
const { adminLoginValidator } = require("./validation/adminLoginValidation");

router.post("/", adminLoginValidator, adminLogin);

module.exports = router;
