module.exports.createCustomer = async (req, res) => {
    try {
      console.log(req.user);
  
      return res.status(200).json({
        success: true,
        message: "Under development...",
      });
    } catch (error) {
      console.error("Error occurred while creating customer", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  