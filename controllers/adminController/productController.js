const { validationResult } = require("express-validator");
const { discardFiles } = require("../../utils/discardFiles");
const db = require("../../db");

module.exports.createProduct = async (req, res) => {
  const image_url = req.file.path;
  try {
    const { name, description, price } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      discardFiles(image_url);
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let newProduct = await db.query(
      "INSERT INTO products (name, description, price, image_url) VALUES ($1, $2, $3, $4) returning id, name, description, price, image_url",
      [name, description, price, image_url]
    );

    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      newProduct: newProduct.rows[0],
    });
  } catch (error) {
    discardFiles(image_url);
    console.error("Error occurred while creating a product", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.listProducts = async (req, res) => {
  try {
    let {rows} = await db.query("SELECT * FROM products");
    return res.status(200).json({
      success: true,
      productList: rows
    })
  } catch (error) {
    console.error("Error occurred while listing products", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
