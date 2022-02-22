const express = require("express");
const Folder = require("../Models/folderModel");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const { folderName } = req.body;
    const folder = await Folder.find({ folderName }).lean().exec();

    res.status(200).json({ folder, path: folder[0].path });
  } catch (e) {
    res.status(401).json(e);
  }
});
router.post("", async (req, res) => {
  try {
    const { folderName, user, path, parentId } = req.body;
    const payload = { folderName, user, path, parentId };
    const newFolder = await Folder.create(payload);
    res.status(201).json(newFolder);
  } catch (e) {
    res.status(401).json(e);
  }
});
module.exports = router;
