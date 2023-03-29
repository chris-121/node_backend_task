const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, `${path.resolve(__dirname, "../Images")}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + path.extname(file.originalname));
  },
});

const multipleUpload = multer({ storage }).any();

module.exports = multipleUpload;
