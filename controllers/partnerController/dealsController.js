const { validationResult } = require("express-validator");
const db = require("../../db");
const PdfService = require("../../services/PdfService");
const DocxService = require("../../services/DocxService");

module.exports.createDeal = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerId, productId, quantity } = req.body;

    const {
      rows: [customer],
    } = await db.query("SELECT * FROM customers WHERE id=$1 AND approved = true", [customerId]);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Couldn't find customer",
      });
    }

    const {
      rows: [product],
    } = await db.query("SELECT * FROM products WHERE id=$1", [productId]);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Couldn't find product",
      });
    }

    const pdfPath = PdfService.generatePdfQuotation(
      customer.name,
      product,
      quantity
    );

    if (!pdfPath.filePath) {
      console.error("Error occurred while generating .pdf file", pdfPath.error);
      return res.status(404).json({
        success: false,
        message: "Internal server error",
      });
    }

    let docxPath = await DocxService.generateDocxProposal(customer, product);
    if (!docxPath.filePath) {
      console.error(
        "Error occurred while generating .docx file",
        docxPath.error
      );
      return res.status(404).json({
        success: false,
        message: "Internal server error",
      });
    }

    const newDeal = await db.query(
      "INSERT INTO deals (user_id, customer_id, product_id, quantity, quotation_url, proposal_url) VALUES ($1, $2, $3, $4, $5, $6) returning id, customer_id, product_id, quantity, quotation_url, proposal_url",
      [
        req.user.id,
        customer.id,
        product.id,
        quantity,
        pdfPath.filePath,
        docxPath.filePath,
      ]
    );

    return res.status(200).json({
      success: true,
      message: "Deal created successfully",
      newDeal: newDeal.rows[0],
    });
  } catch (error) {
    console.error("Error occurred while creating a deal", error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.fetchDeals = async (req, res) => {
  try {
    const { rows: deals } = await db.query("SELECT * FROM deals");
    return res.status(200).json({
      success: true,
      deals,
    });
  } catch (error) {
    console.error("Error occurred while fetching deals", error);
    return res.status(200).json({
      success: false,
      message: "Internal server error",
    });
  }
};
