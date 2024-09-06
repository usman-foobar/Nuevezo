const { validationResult } = require("express-validator");
const db = require("../../db");

module.exports.createCustomer = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const customer = await db.query(
      "sELECT * FROM customers WHERE email = $1",
      [req.body.email]
    );
    if (customer.rows.length) {
      return res.status(400).json({
        success: false,
        message: "Email exists already",
      });
    }

    const newCustomer = await db.query(
      "INsERT INTO customers (user_id, name, email) VALUEs ($1, $2, $3) returning id, name, email, approved",
      [req.user.id, req.body.name, req.body.email]
    );

    return res.status(200).json({
      success: true,
      message: "Customer created successfully",
      newCustomer: newCustomer.rows[0]
    });
  } catch (error) {
    console.error("Error occurred while creating customer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getAllCustomers = async (req,res) => {
  try {
    const allCustomers = await db.query(
      "SELECT id, user_id, name, email, approved FROM customers"
    );

    return res.status(200).json({
      success: true,
      customersList: allCustomers.rows,
    });
  } catch (error) {
    console.error("Error occurred while fetching all customer", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
