const { validationResult } = require("express-validator");
const { USER_ROLE } = require("../../constants/userRoles");
const db = require("../../db");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { signAdminAccessToken } = require("../../authentication/signToken");

module.exports.adminLogin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    let user = await db.query(
      "SELECT * FROM users WHERE email = $1 AND role = $2 AND approved = $3",
      [req.body.email, USER_ROLE.SUPER_ADMIN, true]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { id, name, email, password, role } = user.rows[0];

    let isValid = await bcrypt.compare(req.body.password, password);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const data = { id };

    const { adminAccessToken } = await signAdminAccessToken("jwt", data);

    return res.status(200).json({
      success: true,
      access_token: adminAccessToken,
      data: { id, name, email, role },
    });
  } catch (error) {
    console.error("Error occurred while logging in Admin", error);
    return res.status(503).json({
      success: false,
      message: "Internal server error",
    });
  }
};
