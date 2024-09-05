const jwt = require("jsonwebtoken");

module.exports.verifyPartnerToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const decode = req.headers.authorization;
    req.accessToken = decode;

    jwt.verify(req.accessToken, process.env.JWT_USER_SECRET, (err, data) => {
      if (!err) {
        req.user = data.sub;
        next();
      } else {
        console.log(err);
        return res.status(401).json({
          success: false,
          message: "Unauthorized User!",
        });
      }
    });
  } catch (error) {
    console.log("Error occurred while validating user token", error);
    return res.status(503).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports.verifyAdminAccessToken = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized User",
      });
    }

    const decode = req.headers.authorization;
    req.accessToken = decode;

    jwt.verify(req.accessToken, process.env.JWT_ADMIN_SECRET, (err, data) => {
      if (!err) {
        req.user = data.sub;
        next();
      } else {
        console.log(err);
        return res.status(401).json({
          success: false,
          message: "Unauthorized User!",
        });
      }
    });
  } catch (error) {
    console.log("Error occurred while validating user token", error);
    return res.status(503).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
