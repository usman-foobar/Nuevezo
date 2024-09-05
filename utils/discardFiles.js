const fs = require("fs");

module.exports.discardFiles = (path) => {
  fs.unlinkSync(path);
};
