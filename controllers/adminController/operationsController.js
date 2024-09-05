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
      "UPDATE users sET approved = $1 WHERE id = $2 AND approved = false returning id, name, email, role, approved",
      [true, req.params.partnerId]
    );

    if(registeredPartner.rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Partner doesn't exist or is already approved"
        })
    }

    return res.status(200).json({
      success: true,
      updatedPartner: registeredPartner.rows[0]
    });
  } catch (error) {
    console.error("Error occurred while approving registration", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.getAllCustomers = async (req, res) => {
  try {
    const allCustomers = await db.query(
      "SELECT id, name, email, approved FROM customers WHERE approved = $1",
      [req.params.approvalStatus]
    );

    return res.status(200).json({
      success: true,
      customerList: allCustomers.rows,
    });
  } catch (error) {
    console.error("Error occurred while fetching customers", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


module.exports.approveCustomerRegistration = async (req, res) => {
  try {
    const registeredCustomer = await db.query(
      "UPDATE customers sET approved = $1 WHERE id = $2 AND approved = false returning id, name, email, role, approved",
      [true, req.params.customerId]
    );

    if(registeredCustomer.rows.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Customer doesn't exist or is already approved"
        })
    }

    return res.status(200).json({
      success: true,
      updatedCustomer: registeredCustomer.rows[0]
    });
  } catch (error) {
    console.error("Error occurred while approving registration", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};