const { model, Schema } = require("mongoose");

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  parentId: { type: "ObjectId", ref: "Folders" },
  file_url: { type: String, required: true },
  extension: { type: String, required: true },
  user: { type: "ObjectID", ref: "Users" },
});

const FileModel = model("files", fileSchema);

module.exports = FileModel;
