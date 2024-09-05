const express = require("express");
const router = express.Router();

const { uploadKycDocs } = require("../../../middlewares/uploadDocs");
const { kycValidator } = require("./validations/kycValidator");

router.get("/");
router.post("/submit-kyc", uploadKycDocs, kycValidator);

module.exports = router;
