const express = require("express");
const Folder = require("../Models/folderModel");

const router = express.Router();

router.get("", async (req, res) => {
  try {
    const tofind = "Docs";
    const folder = await Folder.find({ folderName: tofind }).lean().exec();
    const { path } = folder;
    res.status(200).json({ folder, path });
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
