const app = require("./index");
const port = 3001;
const connect = require("./Configs/db");
app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening on port ${port}`);
  } catch (err) {
    console.log("Something went wrong before connection", err);
  }
});
