const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(__dirname, "../../public/"));
  },
  filename: function (req, file, callback) {
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

const uploadSingle = (fieldName) => {
  return (req, res, next) => {
    const uploadItem = upload.single(fieldName);

    uploadItem(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.send({ message: err.message, errorType: "MulterError" });
      } else if (err) {
        res.send({ message: err.message, errorType: "NormalError" });
      }

      next();
    });
  };
};

module.exports = uploadSingle;
