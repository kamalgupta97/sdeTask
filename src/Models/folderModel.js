const { model, Schema } = require("mongoose");

const folderSchema = new Schema({
  folderName: { type: String, required: true },
  parentId: { type: "ObjectId", ref: "Folders" },
  path: { type: String },
  user: { type: String, ref: "Users" },
});

const Folder = model("folders", folderSchema);

module.exports = Folder;
