let router = require("express").Router();

const partnerRoutes = require("./partnerRoutes/index");
const adminRoutes = require("./adminRoutes/index");

router.use("/admin", adminRoutes);
router.use("/partner", partnerRoutes);

module.exports = router;
