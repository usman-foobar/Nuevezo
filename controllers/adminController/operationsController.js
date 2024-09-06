const db = require("../../db");
const { USER_ROLE } = require("../../constants/userRoles");

module.exports.getAllPartners = async (req, res) => {
  try {
    const allPartners = await db.query(
      "SELECT id, name, email, approved FROM users WHERE role = $1 AND approved = $2",
      [USER_ROLE.PARTNER, req.params.approvalStatus]
    );

    return res.status(200).json({
      success: true,
      partnersList: allPartners.rows,
    });
  } catch (error) {
    console.error("Error occurred while fetching partners", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.approvePartnerRegistration = async (req, res) => {
  try {
    const registeredPartner = await db.query(
      "UPDATE users SET approved = $1 WHERE id = $2 AND approved = false returning id, name, email, role, approved",
      [true, req.params.partnerId]
    );

    if (registeredPartner.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Partner doesn't exist or is already approved",
      });
    }

    return res.status(200).json({
      success: true,
      updatedPartner: registeredPartner.rows[0],
    });
  } catch (error) {
    console.error("Error occurred while approving registration", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.approveCustomerRegistration = async (req, res) => {
  try {
    const registeredCustomer = await db.query(
      "UPDATE customers SET approved = $1 WHERE id = $2 AND approved = false returning id, user_id, name, email, approved",
      [true, req.params.customerId]
    );

    if (registeredCustomer.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Customer doesn't exist or is already approved",
      });
    }

    return res.status(200).json({
      success: true,
      updatedCustomer: registeredCustomer.rows[0],
    });
  } catch (error) {
    console.error("Error occurred while approving registration", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.approveDeal = async (req, res) => {
  try {
    const deal = await db.query(
      "UPDATE deals SET approved = $1 WHERE id = $2 AND approved = false returning id, customer_id, product_id, quantity, quotation_url, proposal_url",
      [true, req.params.dealId]
    );

    if (deal.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Deal doesn't exist or is already approved",
      });
    }

    return res.status(200).json({
      success: true,
      deal: deal.rows[0],
    });
  } catch (error) {
    console.error("Error occurred while approving registration", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
