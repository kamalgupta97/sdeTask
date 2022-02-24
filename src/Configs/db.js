const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://kamal:kamal@awscluster.ummcp.mongodb.net/sdetask?retryWrites=true&w=majority"
  );
  // return mongoose.connect("mongodb://localhost:27017/sdetask");
};
