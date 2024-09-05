const { validationResult } = require("express-validator");
const db = require("../../db");
const { USER_ROLE } = require("../../constants/userRoles");
const bcrypt = require("bcryptjs/dist/bcrypt");
const { signPartnerAccessToken } = require("../../authentication/signToken");

module.exports.registerPartner = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: errors.array(),
    });
  }
  try {
    const { name, email, password } = req.body;

    let user = await db.query("sELECT * FROM users WHERE email = $1", [email]);

    if (user.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email exists already, try logging in",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let newUser = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) returning id, name, email, role, approved",
      [name, email, hashedPassword, USER_ROLE.PARTNER]
    );
    return res.status(200).json({
      success: true,
      data: newUser.rows,
    });
  } catch (error) {
    console.error("Error occurred while registering user", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports.loginPartner = async (req, res) => {
  try {
    let user = await db.query("SELECT * FROM users WHERE email = $1", [
      req.body.email,
    ]);

    if (user.rows.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const { id, name, email, password, approved, role } = user.rows[0];

    const isValid = await bcrypt.compare(req.body.password, password);

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!approved) {
      return res.status(400).json({
        success: false,
        message: "Please wait for your account to be verified",
      });
    }

    const data = { id };

    let { accessToken } = await signPartnerAccessToken("jwt", data);

    return res.status(200).json({
      success: true,
      access_token: accessToken,
      user: {
        id,
        name,
        email,
        role,
        approved,
      },
    });
  } catch (error) {
    console.error("Error occurred while logging in User", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

