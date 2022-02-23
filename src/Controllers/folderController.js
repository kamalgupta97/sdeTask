const express = require("express");
const Folder = require("../Models/folderModel");
const FileModel = require("../Models/fileModel");

const router = express.Router();

// get response for root folder and item and its subfolders

router.get("/root", async (req, res) => {
  try {
    const folders = await Folder.find({ parentId: null }).lean().exec();
    const files = await FileModel.find({ parentId: null }).lean().exec();
    res.status(200).json({ folders, files, currentPath: "/" });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/root/:id", async (req, res) => {
  try {
    const folders = await Folder.find({ parentId: req.params.id }, { __v: 0 })
      .lean()
      .exec();
    const files = await FileModel.find({ parentId: req.params.id }, { __v: 0 })
      .lean()
      .exec();

    res.status(200).json({ folders, files, currentPath: folders[0].path });
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("", async (req, res) => {
  try {
    const { folderName, user, path, parentId } = req.body;

    const payload = { folderName, user, path, parentId };
    const newFolder = await Folder.create(payload);
    const { id } = newFolder;

    if (parentId) {
      Folder.findById(parentId, function (err, doc) {
        if (err) res.status(400).json(err);
        doc.childfolders.push(id);
        doc.ItemsInside++;
        doc.save(() => {});
      });
    }
    res.status(201).json(newFolder);
  } catch (e) {
    res.status(401).json(e);
  }
});

// Delete a folder

router.delete("/:id", async (req, res) => {
  try {
    const checkisEmpty = await Folder.findById(req.params.id).lean().exec();
    const { ItemsInside } = checkisEmpty;
    if (ItemsInside == 0) {
      const folder = await Folder.findByIdAndDelete(req.params.id);
      const { parentId, _id } = folder;

      if (parentId) {
        const updateFolder = await Folder.findById(parentId).lean().exec();
        updateFolder.ItemsInside--;
        updateFolder.childfolders = updateFolder.childfolders.filter(
          (item) => item.toString() !== _id.toString()
        );

        const newItem = await Folder.findByIdAndUpdate(parentId, updateFolder, {
          new: true,
        });
      }
      res.status(201).json(folder);
    } else {
      res.status(400).json({ message: "Folder is Not empty" });
    }
  } catch (e) {
    res.status(500).json({ OutsideError: e });
  }
});

// Rename a folder

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedItem = await Folder.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(201).json(updatedItem);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch("/move/:id", async (req, res) => {
  try {
    const newParentId = req.body.parentId;

    const folder = await Folder.findById(req.params.id).lean().exec();

    const { parentId, _id } = folder;
    if (parentId !== null && newParentId !== null) {
      const parentfolder = await Folder.findById(parentId).lean().exec();
      parentfolder.ItemsInside--;
      parentfolder.childfolders = parentfolder.childfolders.filter(
        (item) => item.toString() !== _id.toString()
      );
      const oldParent = await Folder.findByIdAndUpdate(parentId, parentfolder, {
        new: true,
      });
      const newFolder = await Folder.findById(newParentId).lean().exec();
      newFolder.ItemsInside++;
      newFolder.childfolders.push(_id);
      const newParent = await Folder.findByIdAndUpdate(newParentId, newFolder, {
        new: true,
      });
      folder.parentId = newParentId;
      folder.path = newParent.path + folder.folderName;

      const updated = await Folder.findByIdAndUpdate(_id, folder, {
        new: true,
      });

      res.status(201).json({ updated, oldParent, newParent });
    } else if (parentId == null) {
      folder.parentId = newParentId;
      const newFolder = await Folder.findById(newParentId).lean().exec();
      newFolder.ItemsInside++;
      newFolder.childfolders.push(_id);
      const newParent = await Folder.findByIdAndUpdate(newParentId, newFolder, {
        new: true,
      });
      folder.path = newParent.path + newParent.folderName;
      const updated = await Folder.findByIdAndUpdate(_id, folder, {
        new: true,
      });

      res.status(201).json({ updated, newParent, oldParent: null });
    } else if (newParentId == null) {
      const oldParent = await Folder.findById(parentId).lean().exec();

      oldParent.ItemsInside--;

      oldParent.childfolders = oldParent.childfolders.filter(
        (item) => item.toString() !== _id.toString()
      );

      const newParent = await Folder.findByIdAndUpdate(parentId, oldParent, {
        new: true,
      });
      folder.parentId = null;
      folder.path = "/";
      const updated = await Folder.findByIdAndUpdate(_id, folder, {
        new: true,
      });

      res.status(201).json({ updated, newParent, oldParent });
    }
  } catch (e) {
    res.status(500).json(e);
  }
});
module.exports = router;
