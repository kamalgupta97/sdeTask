const express = require("express");
const app = express();
app.use(express.json());
const { login, register } = require("./Controllers/authController");
const folderController = require("./Controllers/folderController");
const fileController = require("./Controllers/fileController");
app.post("/login", login);
app.post("/register", register);
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Mydrive App" });
});

app.use("/folders", folderController);
app.use("/files", fileController);

module.exports = app;
