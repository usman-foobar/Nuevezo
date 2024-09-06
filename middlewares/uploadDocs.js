const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const storagePath = "./public/uploads/productImages";
    if (!fs.existsSync(storagePath)) {
      fs.mkdirSync(storagePath, { recursive: true });
    }
    cb(null, storagePath);
  },

  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname +
        "_" +
        Date.now() +
        "_" +
        Math.floor(100000 + Math.random() * 900000) +
        "_" +
        path.extname(file.originalname)
    );
  },
});

// Initialize Upload
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("productImage");

function checkFileType(file, cb) {
  // Allowed Extensions
  const fileTypes = /.jpg|.png|.jpeg|.svg|.bmp/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb({ code: "NOT_AN_IMAGE" }, false);
  }
}

module.exports.uploadProductImage = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File size must be less than 5Mb",
        });
      }
      if (err.code === "NOT_AN_IMAGE") {
        return res.status(400).json({
          success: false,
          message: ".JPG, .JPEG, svg, .PNG, .bmp files are allowed",
        });
      }
      if (err.code === "LIMIT_UNEXPECTED_FILE") {
        return res.status(400).json({
          success: false,
          message: "Max upload limit exceeded",
        });
      } else {
        console.log("Error occurred while uploading the file", err);
        return res.status(400).json({
          success: false,
          message: "Couldn't upload the file",
        });
      }
    } else {      
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Please choose product image",
        });
      }
      next();
    }
  });
};
