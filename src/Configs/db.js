require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(process.env.ATLAS_DB_SECRET_KEY);
};
