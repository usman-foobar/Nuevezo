const express = require("express");
const dealsController = require("../../../controllers/partnerController/dealsController");
const { createDealValidator } = require("./validations/createDealValidator");
const router = express.Router();

router.post("/create", createDealValidator, dealsController.createDeal);
router.get("/list", dealsController.fetchDeals);

module.exports = router;
