const JWT = require("jsonwebtoken");

module.exports.signPartnerAccessToken = async (iss, sub) => {
  try {
    let accessToken = JWT.sign({ iss, sub }, process.env.JWT_USER_SECRET, {
      expiresIn: 60 * 60 * 24,
    });

    return {
      success: true,
      accessToken,
    };
  } catch (error) {
    console.log("Error occurred while signing User Access token", error);
    return { success: false };
  }
};

module.exports.signAdminAccessToken = async (iss, sub) => {
  try {
    let adminAccessToken = JWT.sign(
      { iss, sub },
      process.env.JWT_ADMIN_SECRET,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    return {
      success: true,
      adminAccessToken,
    };
  } catch (error) {
    console.log("Error occurred while signing Password Recovery token", error);
    return { success: false };
  }
};
