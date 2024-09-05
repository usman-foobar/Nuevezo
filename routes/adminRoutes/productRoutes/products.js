const express = require("express");
const productController = require("../../../controllers/adminController/productController");
const { uploadProductImage } = require("../../../middlewares/uploadDocs");
const { createProductValidator } = require("./validations/createProductValidator");
const router = express.Router();

router.post("/create", uploadProductImage, createProductValidator, productController.createProduct);
router.get("/list", productController.listProducts);

module.exports = router;
