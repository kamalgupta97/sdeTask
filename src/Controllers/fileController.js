const express = require("express");
const upload = require("../Middlewares/fileuploads");
const router = express.Router();
const File = require("../Models/fileModel");

router.post("/", upload.single("file_url"), async function (req, res, next) {
  try {
    const { fileName, parentId, extension, user } = req.body;
    const file_url = req.file.path;
    const payload = {
      fileName,
      parentId,
      extension,
      user,
      file_url,
    };
    console.log(payload);
    const file = await File.create(payload);
    res.status(201).json(file);
  } catch (e) {
    res.status(401).json(e);
  }
});

module.exports = router;
