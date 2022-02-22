const { model, Schema } = require("mongoose");

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  parentId: { type: String, required: true },
  file_url: { type: String, required: true },
  extension: { type: String, required: true },
  user: { type: "ObjectID", ref: "Users" },
});

const File = model("files", fileSchema);

model.exports = File;
