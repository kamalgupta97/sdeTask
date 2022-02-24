require("dotenv").config();
const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    `mongodb+srv://kamal:${process.env.ATLAS_DB_SECRET_KEY}@awscluster.ummcp.mongodb.net/sdetask?retryWrites=true&w=majority`
  );
};
