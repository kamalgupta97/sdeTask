const { model, Schema } = require("mongoose");

const folderSchema = new Schema({
  folderName: { type: String, required: true },
  parentId: { type: "ObjectId", ref: "Folders" },
  path: { type: String },
  user: { type: String, ref: "Users" },
  childfolders: [{ type: "ObjectId", ref: "Folders" }],
  childfiles: [{ type: "ObjectId", ref: "Files" }],
  totalItems: { type: Number, default: 0 },
});

const Folder = model("folders", folderSchema);

module.exports = Folder;
