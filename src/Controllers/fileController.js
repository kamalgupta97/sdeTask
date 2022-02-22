const express = require("express");
const uploadSingle = require("../Middlewares/fileuploads");
const FileModel = require("../Models/fileModel");
const router = express.Router();

router.post("/", uploadSingle("file_url"), async (req, res) => {
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
    const newFile = await FileModel.create(payload);
    res.status(201).json(newFile);
  } catch (e) {
    res.status(401).json(e);
  }
});

module.exports = router;
