const express = require("express");
const authenticate = require("../Middlewares/authenticate");
const authorise = require("../Middlewares/authorise");
const uploadSingle = require("../Middlewares/fileuploads");
const FileModel = require("../Models/fileModel");
const Folder = require("../Models/folderModel");
const router = express.Router();

router.post(
  "/",
  uploadSingle("file_url"),
  authenticate,

  async (req, res) => {
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

      const newFile = await FileModel.create(payload);
      const { id } = newFile;
      if (parentId) {
        Folder.findById(parentId, function (err, doc) {
          if (err) res.status(400).json(err);
          doc.childfiles.push(id);
          doc.ItemsInside++;
          doc.save(() => {});
        });
      }
      res.status(201).json(newFile);
    } catch (e) {
      res.status(401).json(e);
    }
  }
);

// Delete file

router.delete("/:id", authenticate, authorise(FileModel), async (req, res) => {
  try {
    const file = await FileModel.findByIdAndDelete(req.params.id, { __v: 0 })
      .lean()
      .exec();

    const { parentId, _id } = file;
    if (parentId) {
      const updateFolder = await Folder.findById(parentId).lean().exec();
      updateFolder.ItemsInside--;
      updateFolder.childfiles = updateFolder.childfiles.filter(
        (item) => item.toString() !== _id.toString()
      );

      const newItem = await Folder.findByIdAndUpdate(parentId, updateFolder, {
        new: true,
      });
    }

    res.status(201).json(file);
  } catch (e) {
    res.status(400).json(e);
  }
});

// Rename a file

router.patch("/:id", authenticate, authorise(FileModel), async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    const updatedItem = await FileModel.findByIdAndUpdate(id, update, {
      new: true,
    });

    res.status(201).json(updatedItem);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.patch(
  "/move/:id",
  authenticate,
  authorise(FileModel),
  async (req, res) => {
    try {
      const newParentId = req.body.parentId;

      const file = await FileModel.findById(req.params.id).lean().exec();
      const { parentId, _id } = file;
      if (newParentId !== null && parentId !== null) {
        const folder = await Folder.findById(parentId).lean().exec();
        folder.ItemsInside--;
        folder.childfiles = childfiles = folder.childfiles.filter(
          (item) => item.toString() !== _id.toString()
        );
        const oldParent = await Folder.findByIdAndUpdate(parentId, folder, {
          new: true,
        });
        const newFolder = await Folder.findById(newParentId).lean().exec();
        newFolder.ItemsInside++;
        newFolder.childfiles.push(_id);
        const newParent = await Folder.findByIdAndUpdate(
          newParentId,
          newFolder,
          {
            new: true,
          }
        );
        file.parentId = newParentId;
        const updated = await FileModel.findByIdAndUpdate(_id, file, {
          new: true,
        });

        res.status(201).json({ updated, oldParent, newParent });
      } else if (parentId == null) {
        const newFolder = await Folder.findById(newParentId).lean().exec();
        newFolder.ItemsInside++;
        newFolder.childfiles.push(_id);
        const newParent = await Folder.findByIdAndUpdate(
          newParentId,
          newFolder,
          {
            new: true,
          }
        );
        file.parentId = newParentId;
        const updated = await FileModel.findByIdAndUpdate(_id, file, {
          new: true,
        });

        res.status(201).json({ updated, newParent, oldParent: null });
      } else if (newParentId == null) {
        const oldParent = await Folder.findById(parentId).lean().exec();

        oldParent.ItemsInside--;

        oldParent.childfiles = oldParent.childfiles.filter(
          (item) => item.toString() !== _id.toString()
        );

        const newParent = await Folder.findByIdAndUpdate(parentId, oldParent, {
          new: true,
        });
        file.parentId = null;
        const updated = await FileModel.findByIdAndUpdate(_id, file, {
          new: true,
        });

        res.status(201).json({ updated, newParent, oldParent });
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
);
module.exports = router;
